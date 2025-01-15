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
  const [isExpanded, setIsExpanded] = useState(true);
  const animatedHeight = useRef(new Animated.Value(1)).current;

  const toggleExpand = () => {
    Animated.spring(animatedHeight, {
      toValue: isExpanded ? 0 : 1,
      useNativeDriver: false,
      tension: 40,
      friction: 8
    }).start();
    setIsExpanded(!isExpanded);
  };

  const containerHeight = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [70, 278]
  });

  const contentOpacity = animatedHeight;

  return (
    <Animated.View style={[styles.betCard, { height: containerHeight, overflow: 'hidden' }]}>
        <TouchableOpacity onPress={toggleExpand}>
      <View style={styles.betHeader}>
        <Text style={styles.betAmount}>€{bet?.amount} {bet?.type}
          <View style={{ paddingLeft: 8 }}></View>
          {!isExpanded && <Text style={{ color: '#8E8E93', fontSize: 11, fontWeight: 'bold' }}> {bet?.selection} </Text>}
        </Text>
         {isExpanded && <Text style={{ color: '#00FF9D', fontSize: 13, fontWeight: 'bold' }}>Share</Text>}
          {!isExpanded && <TouchableOpacity onPress={toggleExpand} style={{backgroundColor:'#424645', paddingHorizontal:20, paddingVertical:3, borderRadius:3}}>
             <Text style={{textAlign:'center',color:'#00FF9D', fontWeight:'bold', fontSize:12}}>€0.19</Text>
             <Text style={{color:'#00FF9D', fontWeight:'bold',fontSize:12}}>Returned</Text>
          </TouchableOpacity>}

      </View>
        </TouchableOpacity>
      {/* hiding the line if not isexpanded */}
      {isExpanded && <View style={{ height: 1, backgroundColor: 'grey', marginBottom: 10 }} />}
      <Animated.View style={[styles.expandableContent, { opacity: contentOpacity }]}>
        <View style={styles.selectionContainer}>
          <View style={styles.iconOverlay}>
            <FontAwesome name="circle" size={18} color="white" />
            <MaterialIcons name="check-circle" size={20} color="#1A966E" style={styles.checkIcon} />
          </View>
          <View style={styles.selectionInfo}>
            <Text style={styles.selectionText}>{bet?.selection} {bet?.odds}</Text>
            <Text style={styles.betTypeText}>{bet?.betType}</Text>
          </View>
        </View>

        <View style={styles.teamsContainer}>
          <Text style={styles.teamText}>{bet?.team1}</Text>
          <Text style={styles.teamText}>{bet?.team2}</Text>
        </View>

        <View style={styles.stakeReturnContainer}>
          <View>
            <Text style={styles.labelText}>Stake</Text>
            <Text style={styles.valueText}>€{bet?.stake}</Text>
          </View>
          <View>
            <Text style={styles.labelText}>Return</Text>
            <Text style={{
              fontSize: 15,
              color: 'lightgrey',
              fontWeight: 'bold'
            }}>€{bet?.return}</Text>
          </View>
        </View>
      </Animated.View>

      <View style={[
        styles.returnedContainer,
      ]}>
        <MaterialIcons name="check-circle-outline" size={19} color="#00FF9D" />
        <Text style={styles.returnedText}>€{bet?.return} {bet?.status}</Text>
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

      <ScrollView style={styles.betsContainer}>
        {sampleBets && sampleBets.map((bet) => (
          <BetCard key={bet?.id} bet={bet} />
        ))}
        <Text style={styles.historyText}>
          View older settled bets in your Account History
        </Text>
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
    fontSize: 30,
    fontWeight: 'bold',
    padding: 16,
  },
  filtersContainer: {
    paddingHorizontal: 10,
    maxHeight: 50,
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
    fontSize: 12.5,
    fontWeight: 'semibold',
  },
  activeFilterText: {
    color: '#000000',
  },
  betsContainer: {
    flex: 1,
    padding: 16,
  },
  betCard: {
    backgroundColor: '#323b38',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  betHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  betAmount: {
    color: '#26ffbb',
    fontSize: 16,
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
    fontSize: 14,
    fontWeight: 'bold',
  },
  iconOverlay: {
    position: 'relative',
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    position: 'absolute',
    top: 2,
    left: 2,
  },
  betTypeText: {
    color: '#8E8E93',
    fontSize: 13,
  },
  teamsContainer: {
    marginBottom: 16,
  },
  teamText: {
    color: '#FFFFFF',
    fontSize: 14,
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
    fontSize: 15,
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
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  returnedText: {
    color: '#26ffbb',
    marginLeft: 8,
    fontSize: 15,
    fontWeight: 'bold',
  },
  historyText: {
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#FFFFFF',
    paddingVertical: 11,
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