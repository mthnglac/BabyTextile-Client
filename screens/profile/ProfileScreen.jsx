import * as React from 'react';
import {
  Image, SafeAreaView, StyleSheet, Text, View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AuthContext from '../../constants/auth/AuthContext';

const white = '#fff';
const greyDark = '#52575D';
const greyLight = '#DFD8C8';
const dark = '#41444B';
const neonGreen = '#34FFB9';
const grey = '#AEB5BC';
const cream = '#CABFAB';
const black = 'rgba(0, 0, 0, 0.38)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  text: {
    fontFamily: 'space-mono',
    color: greyDark,
  },
  subText: {
    fontSize: 12,
    color: grey,
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  imageView: {
    alignSelf: 'center',
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginHorizontal: 16,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },
  dm: {
    backgroundColor: dark,
    position: 'absolute',
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: neonGreen,
    position: 'absolute',
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  add: {
    backgroundColor: dark,
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtn: {
    marginTop: 6,
    marginLeft: 2,
  },
  infoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  infoName: {
    fontWeight: '200',
    fontSize: 36,
  },
  infoJob: {
    color: grey,
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 32,
  },
  statsBox: {
    alignItems: 'center',
    flex: 1,
  },
  statBoxSecond: {
    borderColor: greyLight,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  statsText: {
    fontSize: 24,
  },
  mediaView: {
    marginTop: 32,
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  mediaCount: {
    backgroundColor: dark,
    position: 'absolute',
    top: '50%',
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    shadowColor: black,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  mediaCountFirstText: {
    fontSize: 24,
    color: greyLight,
    fontWeight: '300',
  },
  mediaCountSecondText: {
    fontSize: 12,
    color: greyLight,
    textTransform: 'uppercase',
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  recentItemIndicator: {
    backgroundColor: cream,
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20,
  },
  recentActivityContainer: {
    alignItems: 'center',
  },
  recentItemTextContainer: {
    width: 250,
  },
  recentItemFirstText: {
    color: dark,
    fontWeight: '300',
  },
  recentItemSubText: {
    fontWeight: '400',
  },
});

export default function ProfileScreen() {
  // eslint-disable-next-line no-unused-vars
  const { signOut } = React.useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
          <Ionicons name="ios-arrow-back" size={24} color={greyDark} />
          <Ionicons name="md-more" size={24} color={greyDark} />
        </View>
        <View style={styles.imageView}>
          <View style={styles.profileImage}>
            <Image
              source={require('../../assets/images/profileScreen/profile-pic.jpg')}
              style={styles.image}
              resizeMode="center"
            />
          </View>
          <View style={styles.dm}>
            <MaterialIcons name="chat" size={18} color={greyLight} />
          </View>
          <View style={styles.active} />
          <View style={styles.add}>
            <Ionicons name="ios-add" size={48} color={greyLight} style={styles.addBtn} />
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={[styles.text, styles.infoName]}>Julie</Text>
          <Text style={[styles.text, styles.infoJob]}>Photographer</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text styles={[styles.text, styles.statsText]}>483</Text>
            <Text styles={[styles.text, styles.subText]}>Posts</Text>
          </View>
          <View style={[styles.statsBox, styles.statBoxSecond]}>
            <Text styles={[styles.text, styles.statsText]}>45,844</Text>
            <Text styles={[styles.text, styles.subText]}>Followers</Text>
          </View>
          <View style={styles.statsBox}>
            <Text styles={[styles.text, styles.statsText]}>302</Text>
            <Text styles={[styles.text, styles.subText]}>Following</Text>
          </View>
        </View>
        <View style={styles.mediaView}>
          <ScrollView horizontal showHorizontalScrollIndicator={false}>
            <View style={styles.mediaImageContainer}>
              <Image
                source={require('../../assets/images/profileScreen/media1.jpg')}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <View style={styles.mediaImageContainer}>
              <Image
                source={require('../../assets/images/profileScreen/media2.jpg')}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <View style={styles.mediaImageContainer}>
              <Image
                source={require('../../assets/images/profileScreen/media3.jpg')}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          </ScrollView>
          <View style={styles.mediaCount}>
            <Text style={[styles.text, styles.mediaCountFirstText]}>70</Text>
            <Text style={[styles.text, styles.mediaCountSecondText]}>Media</Text>
          </View>
        </View>
        <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
        <View style={styles.recentActivityContainer}>
          <View style={styles.recentItem}>
            <View style={styles.recentItemIndicator} />
            <View style={styles.recentItemTextContainer}>
              <Text style={[styles.text, styles.recentItemFirstText]}>
                Started following
                {' '}
                <Text style={styles.recentItemSubText}>Jake Challeahe</Text>
              </Text>
            </View>
          </View>
          <View style={styles.recentItem}>
            <View style={styles.recentItemIndicator} />
            <View style={styles.recentItemTextContainer}>
              <Text style={[styles.text, styles.recentItemFirstText]}>
                Started following
                {' '}
                <Text style={styles.recentItemSubText}>
                  Jake Challeahe and
                  {' '}
                  <Text style={styles.recentItemSubText}>DesignIntoCode</Text>
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
