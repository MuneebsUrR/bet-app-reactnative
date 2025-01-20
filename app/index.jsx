import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Platform, Animated } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useRouter } from 'expo-router';
const filters = ['Cash Out', 'Live Now', 'Unsettled', 'Settled', 'All'];
import Octicons from '@expo/vector-icons/Octicons';
import { Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAppContext } from '@/context/AppContext';



const BetCard = ({ bet }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    Animated.timing(animatedHeight, {
      toValue: isExpanded ? 0 : 1,
      duration: 230, // Smooth transition duration
      useNativeDriver: false,
    }).start();
    setIsExpanded(!isExpanded);
  };

  const containerHeight = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [50, bet?.isDoubleBet ? 376 : 266], // Adjust these values as needed
  });

  const minimizedTextOpacity = animatedHeight.interpolate({
    inputRange: [0, 0.2],
    outputRange: [1, 0], // Gradual fade-out
  });

  const expandedContentOpacity = animatedHeight.interpolate({
    inputRange: [0.8, 1],
    outputRange: [0, 1], // Gradual fade-in
  });

  return (
    <Animated.View style={[styles.betCard, { height: containerHeight, overflow: 'hidden' }]}>
      <TouchableOpacity onPress={toggleExpand}>
        <View style={styles.betHeader}>
          <Text style={styles.betAmount}>
            €{bet?.amount} {bet?.type}
            <View style={{ paddingLeft: 8 }}></View>
            <Animated.Text
              style={[
                {
                  color: '#8E8E93',
                  fontSize: 11,
                  fontWeight: 'bold',
                  opacity: minimizedTextOpacity,
                  position: isExpanded ? 'absolute' : 'relative',
                },
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {!isExpanded && (
                bet?.isDoubleBet
                  ? (() => {
                    const combinedText = `${bet?.selection}, ${bet?.selection2}`;
                    return combinedText.length > 20
                      ? `${combinedText.substring(0, 20)}...`
                      : combinedText;
                  })()
                  : (bet?.selection?.length > 20
                    ? `${bet?.selection.substring(0, 20)}...`
                    : bet?.selection)
              )}
            </Animated.Text>
          </Text>
          {isExpanded && bet?.return != '0.00' && <Text style={{ color: '#00FF9D', fontSize: 12, fontWeight: '600', marginBottom: 12 }}>
            Share
          </Text>}
          {isExpanded && bet?.return == '0.00' &&
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: -4 }}>
              <Text style={{ color: '#00FF9D', fontSize: 12, fontWeight: '600', paddingRight: 30 }}>
                Share
              </Text>
              <View style={{ height: 35, width: 90, backgroundColor: '#424645', position: 'relative', top: -6, borderRadius: 3, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#d7d7d7', fontWeight: 'bold', fontSize: 12 }}>
                  Lost
                </Text>
              </View>
            </View>
          }

          {
            !isExpanded && bet?.return != '0.00' &&

            <TouchableOpacity
              onPress={toggleExpand}
              style={{
                backgroundColor: '#424645',
                width: 90,
                height: 35,
                borderRadius: 3,
                position: 'relative',
                top: -7.5,
              }}
            >
              <Text style={{ textAlign: 'center', color: '#00FF9D', fontWeight: 'bold', fontSize: 11.5 }}>
                €{bet?.return}
              </Text>
              <Text style={{ textAlign: 'center', color: '#00FF9D', fontWeight: 'bold', fontSize: 11.5 }}>Returned</Text>
            </TouchableOpacity>
          }
          {
            !isExpanded && bet?.return == '0.00' &&

            <TouchableOpacity
              onPress={toggleExpand}
              style={{
                backgroundColor: '#424645',
                width: 90,
                height: 35,
                borderRadius: 3,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                top: -7.5
              }}
            >
              <Text style={{ color: '#d7d7d7', fontWeight: 'bold', fontSize: 11.5 }}>
                Lost
              </Text>

            </TouchableOpacity>
          }




        </View>
      </TouchableOpacity>

      {isExpanded && <View style={{ height: 1, backgroundColor: 'grey', marginBottom: 10 }} />}
      <Animated.View
        style={[
          styles.expandableContent,
          {
            opacity: expandedContentOpacity,
          },
        ]}
      >
        <View style={styles.selectionContainer}>
          <View style={styles.iconOverlay}>
            <FontAwesome name="circle" size={14} color="white" />
            {bet?.return != '0.00' && <MaterialIcons name="check-circle" size={18} color="#1A966E" style={styles.checkIcon} />}
            {bet?.return == '0.00' && <MaterialIcons name="cancel" size={18} color="#fc6767" style={styles.checkIcon} />}

          </View>
          <View style={styles.selectionInfo}>
            <Text style={styles.selectionText}>
              {bet?.selection} <Text style={{ color: '#d7d7d7' }}>  {bet?.odds}</Text>
            </Text>
            <Text style={styles.betTypeText}>{bet?.betType}</Text>
          </View>
        </View>

        <View style={styles.teamsContainer}>
          <Text style={styles.teamText}>{bet?.team1}</Text>
          <Text style={styles.teamText}>{bet?.team2}</Text>
        </View>

        {bet?.isDoubleBet && (
          <>
            {isExpanded && <View style={{ height: 1, backgroundColor: 'grey', marginBottom: 10, marginTop: -5 }} />}
            <View style={styles.selectionContainer}>
              <View style={styles.iconOverlay}>
                <FontAwesome name="circle" size={14} color="white" />
                {bet?.return != '0.00' && <MaterialIcons name="check-circle" size={18} color="#1A966E" style={styles.checkIcon} />}
                {bet?.return == '0.00' && <MaterialIcons name="cancel" size={18} color="#fc6767" style={styles.checkIcon} />}

              </View>
              <View style={styles.selectionInfo}>
                <Text style={styles.selectionText}>
                  {bet?.selection2} <Text style={{ color: '#d7d7d7' }}>  {bet?.odds2}</Text>
                </Text>
                <Text style={styles.betTypeText}>{bet?.betType2}</Text>
              </View>
            </View>
            <View style={styles.teamsContainer}>
              <Text style={styles.teamText}>{bet?.team3}</Text>
              <Text style={styles.teamText}>{bet?.team4}</Text>

            </View>
          </>
        )}

        <View style={styles.stakeReturnContainer}>
          <View>
            <Text style={styles.labelText}>Stake</Text>
            <Text style={styles.valueText}>€{bet?.stake}</Text>
          </View>
          <View>
            <Text style={styles.labelText}>Return</Text>
            <Text
              style={{
                fontSize: 14,
                color: 'lightgrey',
                fontWeight: 'bold',
              }}
            >
              €{bet?.return}
            </Text>
          </View>
        </View>
      </Animated.View>
      <View style={[styles.returnedContainer]}>
        {bet?.return != '0.00' &&
          <MaterialIcons name="check-circle-outline" size={19} color="#00FF9D" />

        }
        {bet?.return != '0.00' &&

          <Text style={styles.returnedText}>€{bet?.return}  {bet?.status}</Text>
        }

        {bet?.return == '0.00' && <Text style={[styles.returnedText, { color: '#d7d7d7' }]}>{bet?.status}  €{bet?.return}</Text>}
      </View>
    </Animated.View>
  );
};


export default function MyBets() {
  const [activeFilter, setActiveFilter] = useState('Settled');

  const { sampleBets, setSampleBets, totalBalance, setTotalBalance } = useAppContext();


  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }
  );

  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.statusBarBackground} />

      {/* Status bar settings */}
      <StatusBar
        barStyle="light-content" // White text/icons
        translucent={true} // Makes status bar transparent
        backgroundColor="transparent" // Green handled by View
      />
      <View style={styles.header}>
        {/* <Text style={styles.sessionText}>Session 00:09</Text> */}
        <Image
          source={require('../assets/images/image_prev_ui.png')}
          style={{ width: 100, height: 30, marginLeft: 'auto' }}
        />
      </View>

      <Text style={styles.title}>My Bets</Text>

      <ScrollView style={styles.betsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                activeFilter === filter && styles.activeFilter
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[
                styles.filterText,
                activeFilter === filter && styles.activeFilterText
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {sampleBets && sampleBets.map((bet) => (
          <BetCard key={bet?.id} bet={bet} />
        ))}

        <Text style={styles.historyText}>
          View older settled bets in your Account History
        </Text>
        {/* Footer */}
        <View style={{ marginTop: 470, marginBottom: 10, zIndex: 1000 }}>
          <Image
            source={require('../assets/images/footer.jpeg')}
            style={{
              width: '100%',
              height: 390,
              resizeMode: 'cover'
            }}
          />

          <View style={{
            paddingHorizontal: 8.5,
            marginBottom: 30
          }}>
            <Text style={{ color: '#999999', fontSize: 9.5, fontWeight: '500' }}>
              Server Time: {new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })} CET
            </Text>
          </View>
        </View>



      </ScrollView>




      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Octicons name="home" size={20} color="#8E8E93" />
          <Text style={styles.navLabel}>€{totalBalance}</Text>
          {/* <Image 
        source={require('../../assets/images/home-removebg-preview.png')}
        style={styles.navIcon}
          />
          <Text style={styles.navLabel}>€0.60</Text> */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/all-sports')} style={[styles.navItem, styles.activeNavItem]}>
          <AntDesign name="search1" size={20} color="#8E8E93" />
          <Text style={styles.navLabel}>All Sports</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('../assets/images/file (1).png')}
            style={styles.navIcon}
          />
          <Text style={styles.navLabel}>In-Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <AntDesign name="checkcircle" size={20} color="#137a5a" />
          <Text style={[styles.navLabel, styles.activeNavLabel]}>My Bets</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('../assets/images/casino_prev_ui.png')}
            style={styles.navIcon}

          />
          <Text style={styles.navLabel}>Casino</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282828', // Gray background for the rest of the screen
  },
  statusBarBackground: {
    height: Platform.OS === 'android' ? StatusBar.currentHeight : 44, // Adjust for iOS and Android
    backgroundColor: '#055441', // Green for status bar
  },
  header: {
    padding: 16,
    backgroundColor: '#055441',
  },
  sessionText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 29,
    fontWeight: 'bold',
    padding: 16,
  },
  filtersContainer: {

    maxHeight: 50,
    marginBottom: 9
  },
  filterButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
  },
  activeFilter: {
    backgroundColor: '#26ffbb',
    height: 30,
    paddingTop: 7,
  },
  filterText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'semibold',
  },
  activeFilterText: {
    color: '#000000',
    fontWeight: 'bold'
  },
  betsContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  betCard: {
    backgroundColor: '#323b38',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },
  betHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  betAmount: {
    color: '#26ffbb',
    fontSize: 14,
    fontWeight: 'bold',

  },
  selectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  selectionInfo: {
    marginLeft: 8,
  },
  selectionText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: 'bold',
  },
  iconOverlay: {
    position: 'relative',
    width: 24,
    height: 24,
    justifyContent: '',
    alignItems: 'center',
  },
  checkIcon: {
    position: 'absolute',

    top: -1
  },
  betTypeText: {
    color: '#8E8E93',
    fontSize: 12,
  },
  teamsContainer: {
    marginBottom: 16,
  },
  teamText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    marginBottom: 4,
  },
  stakeReturnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  labelText: {
    color: '#8E8E93',
    fontSize: 13,
  },
  valueText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  returnedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#424645',
    marginHorizontal: -16,
    marginBottom: -16,
    padding: 14,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  returnedText: {
    color: '#26ffbb',
    marginLeft: 8,
    fontSize: 13.5,
    fontWeight: 'bold',
  },
  historyText: {
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 32,
    fontSize: 13
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
    backgroundColor: '#FFFFFF',
    paddingVertical: 7.6,
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    color: '#8E8E93',
    fontSize: 10.5,
    marginTop: 4,
  },
  activeNavLabel: {
    color: '#137a5a',
  },
  navIcon: {
    width: 38,
    height: 21,
  },
  activeNavIcon: {
    tintColor: '#137a5a'
  },


});