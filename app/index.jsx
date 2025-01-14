import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useRouter } from 'expo-router';
const filters = ['Cash Out', 'Live Now', 'Unsettled', 'Settled', 'All'];
import Octicons from '@expo/vector-icons/Octicons';
import { Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from './configs/Firebase';
import { useAppContext } from '@/context/AppContext';

export default function MyBets() {
  const [activeFilter, setActiveFilter] = useState('Settled');
  
  const { sampleBets, setSampleBets, totalBalance, setTotalBalance } = useAppContext();


  // useEffect(() => {
  //   const fetchData = async () => {
  //     const docRef = doc(db, "data", "balance");
  //     const docSnap = await getDoc(docRef);

  //     if (docSnap.exists()) {
       
  //       setTotalBalance(docSnap.data().totalBalance);
  //     } else {
  //       // docSnap.data() will be undefined in this case
  //       alert("No such document!");
  //     }

  //   }
  //   fetchData();
  // }
  //   , []);


  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }
  );



  const router = useRouter();

 
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const docRef = doc(db, "data", "bets");
  //     const docSnap = await getDoc(docRef);

  //     if (docSnap.exists()) {
       
  //       setSampleBets(docSnap.data().bets);
  //     } else {
  //       // docSnap.data() will be undefined in this case
  //       console.log("No such document!");
  //     }

  //   }
  //   fetchData();
  // }
  //   , [sampleBets]);


  const BetCard = ({ bet }) => (
    <View style={styles.betCard}>
      <View style={styles.betHeader}>
        <Text style={styles.betAmount}>€{bet?.amount} {bet?.type}</Text>
        <TouchableOpacity>
          <Text style={{color: '#00FF9D', fontSize: 13, fontWeight: 'bold'}}>Share</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 1, backgroundColor: 'grey',marginBottom:'10' }} />

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
            color: 'lightgrey',
            fontSize: 16,
            fontWeight: 'bold',
          }}>€{bet?.return}</Text>
        </View>
      </View>

      {/* <View style={styles.returnedContainer}>
      <MaterialIcons name="check-circle-outline" size={20} color="#00FF9D" />
      
        <Text style={styles.returnedText}>€{bet?.return} {bet?.status}</Text>
      </View> */}
       <View style={styles.returnedContainer}>
      <MaterialIcons name="check-circle-outline" size={20} color="#00FF9D" />
      
        <Text style={styles.returnedText}>€{bet?.return} {bet?.status}</Text>
      </View>
    </View>
  );

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
        style={{width: 100, height: 30, marginLeft: 'auto'}}
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
        <Octicons name="home" size={23} color="#8E8E93" />
        <Text style={styles.navLabel}>€{totalBalance}</Text>
        {/* <Image 
        source={require('../../assets/images/home-removebg-preview.png')}
        style={styles.navIcon}
          />
          <Text style={styles.navLabel}>€0.60</Text> */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/all-sports')} style={[styles.navItem, styles.activeNavItem]}>
          <AntDesign name="search1" size={23} color="#8E8E93" />
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
          <AntDesign name="checkcircle" size={23} color="#137a5a"  />
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
    fontSize: 32,
    fontWeight: 'bold',
    padding: 16,
  },
  filtersContainer: {
    paddingHorizontal: 10,
    maxHeight: 50,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
  },
  activeFilter: {
    backgroundColor: '#26ffbb',
    height: 38,
  },
  filterText: {
    color: '#FFFFFF',
    fontSize: 15,
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
    borderRadius: 12,
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
    fontSize: 18,
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
    fontSize: 16,
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
    fontSize: 14,
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
    fontSize: 14,
  },
  valueText: {
    color: '#FFFFFF',
    fontSize: 16,
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
    fontSize: 16,
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
    paddingVertical: 20,
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    color: '#8E8E93',
    fontSize: 12,
    marginTop: 4,
  },
  activeNavLabel: {
    color: '#137a5a',
  },
  navIcon: {
    width: 40,
    height: 24,
  },
  activeNavIcon: {
    tintColor: '#137a5a'
  },

});