import React, { useEffect, useLayoutEffect,useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  StatusBar, 
  Platform,
  TextInput, 
  Image
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useRouter } from 'expo-router';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../configs/Firebase';


const trendingSports = [
  'Upcoming Soccer',
  'Upcoming Tennis',
  'NBA',
  'Spain Super Cup',
  'Netherlands Eredivisie',
  'Netherlands Eerste Divisie',
  'EFL Cup'
];
import Octicons from '@expo/vector-icons/Octicons';
import { AppProvider, useAppContext } from '../../context/AppContext';

const mostUsedSports = [
  { 
    name: 'SOCCER', 
    image: require('../../assets/images/zClass_Soccer.png') // Assuming the image is in assets folder
  },
  { 
    name: 'BASKETBALL',   
    image: require('../../assets/images/zClass_Basketball.png')
  },
  { 
    name: 'TENNIS', 
    image: require('../../assets/images/zClass_Tennis.png')
  }
];


const allSports = [
  { 
    title: 'AMERICAN FOOTBALL',
    image: require('../../assets/images/rugby-ball.png'),
    style: { width: 24, height: 24 },
    subItems: ['NFL']
  },
  {
    title: 'BASEBALL',
    image: require('../../assets/images/baseball (1).png'),
    style: { width: 30, height: 30 },
    subItems: []
  },
  {
    title: 'BASKETBALL',
    image: require('../../assets/images/zClass_Basketball.png'),
    style: { width: 27, height: 27,marginLeft: 2 },
    subItems: ['Upcoming Matches', 'NBA']
  }
];

export default function MyBets() {
  const navigation = useNavigation();
  const router = useRouter();
  const { totalBalance } = useAppContext();



  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    
    <View style={styles.container}>
      <View style={styles.statusBarBackground} />
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />

      <View style={styles.header}>
        {/* <Text style={styles.sessionText}>Session 00:48</Text> */}
        <Image 
        source={require('../../assets/images/image_prev_ui.png')}
        style={{width: 100, height: 30, marginLeft: 'auto'}}
          />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>All Sports</Text>
        <View style={styles.depositContainer}>
          <Text style={styles.depositText}>Deposit</Text>
          <MaterialCommunityIcons name="account-circle-outline" size={22} color="#FFFFFF" />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={20} color="#8E8E93" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#8E8E93"
        />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TRENDING</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.trendingContainer}>
              {trendingSports.map((sport, index) => (
                <TouchableOpacity key={index} style={styles.trendingItem}>
                  <Text style={styles.trendingText}>{sport}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MOST USED</Text>
          <View style={styles.mostUsedContainer}>
            {mostUsedSports.map((sport, index) => (
              <TouchableOpacity key={index} style={styles.mostUsedItem}>
                <Image 
                  source={sport.image}
                  style={styles.sportIcon}
                  resizeMode="contain"
                />
                <Text style={styles.mostUsedText}>{sport.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>A-Z</Text>
          {allSports.map((sport, index) => (
            <TouchableOpacity key={index} style={styles.sportItem}>
              <View style={styles.sportHeader}>
              <Image 
                  source={sport.image}
                  style={sport.style}
                  resizeMode="contain"
                />
                <Text style={styles.sportTitle}>{sport.title}</Text>
                <MaterialIcons name="chevron-right" size={24} color="#8E8E93" style={styles.chevron} />
              </View>
              {sport.subItems.map((subItem, subIndex) => (
                <Text key={subIndex} style={styles.subItem}>{subItem}</Text>
              ))}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
        <Octicons name="home" size={21} color="#8E8E93" />
        <Text style={styles.navLabel}>€{totalBalance}</Text>
        {/* <Image 
            source={require('../../assets/images/home-removebg-preview.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navLabel}>€0.60</Text> */}
        </TouchableOpacity>
        <View style={[styles.navItem, styles.activeNavItem]}>
          <AntDesign name="search1" size={21} color="#137a5a" />
          <Text style={[styles.navLabel, styles.activeNavLabel]}>All Sports</Text>
        </View>
        <TouchableOpacity style={styles.navItem}>
        <Image 
            source={require('../../assets/images/file (1).png')}
            style={styles.navIcon}
          />
          <Text style={styles.navLabel}>In-Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/')}>
         
          <MaterialIcons name="check-circle-outline" size={21} color="#8E8E93" />
      
          <Text style={styles.navLabel}>My Bets</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
        <Image 
            source={require('../../assets/images/casino_prev_ui.png')}
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
    backgroundColor: '#282828',
  },
  statusBarBackground: {
    height: Platform.OS === 'android' ? StatusBar.currentHeight : 44,
    backgroundColor: '#235441',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#235441',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  sessionText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    color: '#26ffbb',
    fontSize: 30,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  depositContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 16,
  },
  depositText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginRight: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#343a38',
    margin: 16,
    borderRadius: 25,
    padding: 10,
  },
  searchIcon: {
    marginHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    padding: 0,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#26ffbb',
    fontSize: 15,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  trendingContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  trendingItem: {
    backgroundColor: '#343a38',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  trendingText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  mostUsedContainer: {
    flexDirection: 'row',
    backgroundColor: '#343a38',
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  mostUsedItem: {
    flex: 1,
    alignItems: 'center',
  },
  mostUsedText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 8,
  },
  sportIcon: {
    width: 25,
    height: 25,
    marginBottom: 4,
  },
  sportItem: {
    backgroundColor: '#343a38',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 2,
  },
  allSportsIcon: {
    width: 38,
    height: 28,
    marginBottom : 4,
  },
  sportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sportTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
    flex: 1,
  },
  chevron: {
    marginLeft: 'auto',
  },
  subItem: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 36,
    marginTop: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    color: '#8E8E93',
    fontSize: 11,
    marginTop: 4,
  },
  activeNavLabel: {
    color: '#137a5a',
  },
  navIcon: {
    width: 40,
    height: 22,
  },
  activeNavIcon: {
    tintColor: '#137a5a'
  },
});