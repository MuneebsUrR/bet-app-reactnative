// import React, { useLayoutEffect, useState } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';
// import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import { useNavigation, useRouter } from 'expo-router';
// const filters = ['Cash Out', 'Live Now', 'Unsettled', 'Settled', 'All'];

// const sampleBets = [
//     {
//         id: 1,
//         amount: 0.10,
//         type: 'Single',
//         selection: 'Sabah FC U23 or Draw',
//         odds: 1.14,
//         betType: 'Double Chance',
//         team1: 'Sabah FC U23',
//         team2: 'Kuala Lumpur FA U23',
//         stake: 0.10,
//         return: 0.12,
//         status: 'Returned',
//         settled: true
//     },
//     {
//         id: 2,
//         amount: 0.25,
//         type: 'Single',
//         selection: 'Manchester United',
//         odds: 2.00,
//         betType: 'Match Winner',
//         team1: 'Manchester United',
//         team2: 'Arsenal',
//         stake: 0.25,
//         return: 0.50,
//         status: 'Returned',
//         settled: true
//     },
//     {
//         id: 3,
//         amount: 0.15,
//         type: 'Single',
//         selection: 'Over 2.5 Goals',
//         odds: 1.85,
//         betType: 'Total Goals',
//         team1: 'Real Madrid',
//         team2: 'Barcelona',
//         stake: 0.15,
//         return: 0.28,
//         status: 'Returned',
//         settled: true
//     }
// ];

// export default function MyBets() {
//     const [activeFilter, setActiveFilter] = useState('Settled');
//     const navigation = useNavigation();
//     useLayoutEffect(() => {
//         navigation.setOptions({
//             headerShown: false,

//         });
//     }
//     );
//     const router = useRouter();


//     const BetCard = ({ bet }) => (
//         <View style={styles.betCard}>
//             <View style={styles.betHeader}>
//                 <Text style={styles.betAmount}>€{bet.amount.toFixed(2)} {bet.type}</Text>
//                 <TouchableOpacity>
//                     <MaterialIcons name="share" size={20} color="#00FF9D" />
//                 </TouchableOpacity>
//             </View>

//             <View style={styles.selectionContainer}>
//                 <MaterialIcons name="check-circle" size={20} color="#00FF9D" />
//                 <View style={styles.selectionInfo}>
//                     <Text style={styles.selectionText}>{bet.selection} {bet.odds}</Text>
//                     <Text style={styles.betTypeText}>{bet.betType}</Text>
//                 </View>
//             </View>

//             <View style={styles.teamsContainer}>
//                 <Text style={styles.teamText}>{bet.team1}</Text>
//                 <Text style={styles.teamText}>{bet.team2}</Text>
//             </View>

//             <View style={styles.stakeReturnContainer}>
//                 <View>
//                     <Text style={styles.labelText}>Stake</Text>
//                     <Text style={styles.valueText}>€{bet.stake.toFixed(2)}</Text>
//                 </View>
//                 <View>
//                     <Text style={styles.labelText}>Return</Text>
//                     <Text style={styles.valueText}>€{bet.return.toFixed(2)}</Text>
//                 </View>
//             </View>

//             <View style={styles.returnedContainer}>
//                 <MaterialIcons name="check-circle" size={20} color="#00FF9D" />
//                 <Text style={styles.returnedText}>€{bet.return.toFixed(2)} {bet.status}</Text>
//             </View>
//         </View>
//     );

//     return (
//         <View style={styles.container}>
//             <View style={styles.statusBarBackground} />

//             {/* Status bar settings */}
//             <StatusBar
//                 barStyle="light-content" // White text/icons
//                 translucent={true} // Makes status bar transparent
//                 backgroundColor="transparent" // Green handled by View
//             />
//             <View style={styles.header}>
//                 <Text style={styles.sessionText}>Session 10:09</Text>
//             </View>

//             <Text style={styles.title}>My Bets</Text>

//             <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
//                 {filters.map((filter) => (
//                     <TouchableOpacity
//                         key={filter}
//                         style={[
//                             styles.filterButton,
//                             activeFilter === filter && styles.activeFilter
//                         ]}
//                         onPress={() => setActiveFilter(filter)}
//                     >
//                         <Text style={[
//                             styles.filterText,
//                             activeFilter === filter && styles.activeFilterText
//                         ]}>
//                             {filter}
//                         </Text>
//                     </TouchableOpacity>
//                 ))}
//             </ScrollView>

//             <ScrollView style={styles.betsContainer}>
//                 {sampleBets.map((bet) => (
//                     <BetCard key={bet.id} bet={bet} />
//                 ))}
//                 <Text style={styles.historyText}>
//                     View older settled bets in your Account History
//                 </Text>
//             </ScrollView>

//             <View style={styles.bottomNav}>
//                 <View style={styles.navItem}>
//                     <MaterialCommunityIcons name="home" size={24} color="#8E8E93" />
//                     <Text style={styles.navLabel}>Home</Text>
//                 </View>
//                     <View style={[styles.navItem, styles.activeNavItem]}>
//                         <AntDesign name="search1" size={24} color="#137a5a" />
//                         <Text style={styles.activeNavLabel}>All Sports</Text>
//                     </View>
            
//                 <View style={styles.navItem}>
//                     <MaterialCommunityIcons name="soccer-field" size={24} color="#8E8E93" />
//                     <Text style={styles.navLabel}>In-Play</Text>
//                 </View>
//                 <TouchableOpacity onPress={() => router.push('/')} >
//                 <View style={styles.navItem}>
//                     <AntDesign name="checkcircle" size={24} color="#8E8E93" />
//                     <Text style={styles.navLabel}>My Bets</Text>
//                 </View>
//                 </TouchableOpacity>
//                 <View style={styles.navItem}>
//                     <MaterialCommunityIcons name="slot-machine-outline" size={25} color="#8E8E93" />
//                     <Text style={styles.navLabel}>Casino</Text>
//                 </View>
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#282828', // Gray background for the rest of the screen
//     },
//     statusBarBackground: {
//         height: Platform.OS === 'android' ? StatusBar.currentHeight : 44, // Adjust for iOS and Android
//         backgroundColor: '#235441', // Green for status bar
//     },
//     header: {
//         padding: 16,
//         backgroundColor: '#235441',
//     },
//     sessionText: {
//         color: '#FFFFFF',
//         fontSize: 15,
//     },
//     title: {
//         color: '#FFFFFF',
//         fontSize: 32,
//         fontWeight: 'bold',
//         padding: 16,
//     },
//     filtersContainer: {
//         paddingHorizontal: 10,
//         maxHeight: 50,
//     },
//     filterButton: {
//         paddingHorizontal: 12,
//         paddingVertical: 8,
//         marginRight: 8,
//         borderRadius: 20,
//     },
//     activeFilter: {
//         backgroundColor: '#26ffbb',
//         height: 38,
//     },
//     filterText: {
//         color: '#FFFFFF',
//         fontSize: 15,
//     },
//     activeFilterText: {
//         color: '#000000',
//     },
//     betsContainer: {
//         flex: 1,
//         padding: 16,
//     },
//     betCard: {
//         backgroundColor: '#343a38',
//         borderRadius: 12,
//         padding: 16,
//         marginBottom: 16,
//     },
//     betHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 16,
//     },
//     betAmount: {
//         color: '#26ffbb',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     selectionContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 12,
//     },
//     selectionInfo: {
//         marginLeft: 8,
//     },
//     selectionText: {
//         color: '#FFFFFF',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     betTypeText: {
//         color: '#8E8E93',
//         fontSize: 14,
//     },
//     teamsContainer: {
//         marginBottom: 16,
//     },
//     teamText: {
//         color: '#FFFFFF',
//         fontSize: 14,
//         marginBottom: 4,
//     },
//     stakeReturnContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 16,
//     },
//     labelText: {
//         color: '#8E8E93',
//         fontSize: 14,
//     },
//     valueText: {
//         color: '#FFFFFF',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     returnedContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#3A3A3C',
//         padding: 12,
//         borderRadius: 8,
//     },
//     returnedText: {
//         color: '#26ffbb',
//         marginLeft: 8,
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     historyText: {
//         color: '#8E8E93',
//         textAlign: 'center',
//         marginTop: 16,
//         marginBottom: 32,
//     },
//     bottomNav: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         padding: 15,
//         backgroundColor: '#FFFFFF',
//         paddingVertical: 25,
//     },
//     navItem: {
//         alignItems: 'center',
//     },
//     navText: {
//         color: '#FFFFFF',
//         marginBottom: 4,
//     },
//     navLabel: {
//         color: '#8E8E93',
//         fontSize: 12,
//         marginTop: 4,
//     },

//     activeNavLabel: {
//         color: '#137a5a',
//         fontSize: 12,
//         marginTop: 4,
//     },
// });


import React, { useLayoutEffect } from 'react';
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
        <Text style={styles.sessionText}>Session 00:48</Text>
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
        <Octicons name="home" size={24} color="#8E8E93" />
        <Text style={styles.navLabel}>Home</Text>
        {/* <Image 
            source={require('../../assets/images/home-removebg-preview.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navLabel}>€0.60</Text> */}
        </TouchableOpacity>
        <View style={[styles.navItem, styles.activeNavItem]}>
          <AntDesign name="search1" size={24} color="#137a5a" />
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
          <AntDesign name="checkcircle" size={23} color="#8E8E93" />
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
    fontSize: 32,
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
    fontSize: 16,
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
    paddingVertical: 25,
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