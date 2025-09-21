import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './profileStyles'
import ButtonComp from '../../components/ButtonComp';
import { signOutUser } from '../../Services/Firebase/auth';
import { useState } from 'react';
import Colors from '../../constants/colors';
import { ChevronLeft, ChevronRight, LogOut, NotepadText, UserRound } from 'lucide-react-native';
import { moderateScale } from 'react-native-size-matters';

export default function Profile({ navigation }) {

  const [isModalVisible, setModalVisible] = useState(false);
  const [firebaseError, setFirebaseError] = useState('');

  const handleSignOut = async () => {
    setFirebaseError('');
    try {
      await signOutUser(setFirebaseError);
    } catch (error) {
      setModalVisible(false);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={moderateScale(24)} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account</Text>
      </View>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("YourProfile")} style={styles.profileSection}>
          <View style={styles.profileSectionContent}>
            <View style={styles.profileLeft}>
              <UserRound size={moderateScale(24)} color="#000" />
              <Text style={styles.sectionTitle}>Your Profile</Text>
            </View>
            <ChevronRight size={moderateScale(24)} color="#000" />
          </View>
          <View style={styles.separator} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ProductOrder")} style={styles.profileSection}>
          <View style={styles.profileSectionContent}>
            <View style={styles.profileLeft}>
              <NotepadText size={moderateScale(24)} color="#000" />
              <Text style={styles.sectionTitle}>My Order</Text>
            </View>
            <ChevronRight size={moderateScale(24)} color="#000" />
          </View>
          <View style={styles.separator} />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.profileSection}>
          <View style={styles.profileSectionContent}>
            <View style={styles.profileLeft}>
              <CreditCard size={moderateScale(24)} color="#000" />
              <Text style={styles.sectionTitle}>Payment Methods</Text>
            </View>
            <ChevronRight size={moderateScale(24)} color="#000" />
          </View>
          <View style={styles.separator} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileSection}>
          <View style={styles.profileSectionContent}>
            <View style={styles.profileLeft}>
              <Bell name="user" size={moderateScale(24)} color="#000" />
              <Text style={styles.sectionTitle}>Notifications</Text>
            </View>
            <ChevronRight size={moderateScale(24)} color="#000" />
          </View>
          <View style={styles.separator} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileSection}>
          <View style={styles.profileSectionContent}>
            <View style={styles.profileLeft}>
              <Lock name="user" size={moderateScale(24)} color="#000" />
              <Text style={styles.sectionTitle}>Privacy Policy</Text>
            </View>
            <ChevronRight size={moderateScale(24)} color="#000" />
          </View>
          <View style={styles.separator} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileSection}>
          <View style={styles.profileSectionContent}>
            <View style={styles.profileLeft}>
              <CircleQuestionMark name="user" size={moderateScale(24)} color="#000" />
              <Text style={styles.sectionTitle}>Help Center</Text>
            </View>
            <ChevronRight size={moderateScale(24)} color="#000" />
          </View>
          <View style={styles.separator} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileSection}>
          <View style={styles.profileSectionContent}>
            <View style={styles.profileLeft}>
              <UserRoundPlus name="user" size={moderateScale(24)} color="#000" />
              <Text style={styles.sectionTitle}>Invite Friends</Text>
            </View>
            <ChevronRight size={moderateScale(24)} color="#000" />
          </View>
          <View style={styles.separator} />
        </TouchableOpacity> */}
      </View >
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.profileBottom}>
        <LogOut name="settings" size={moderateScale(24)} color="#000" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
      {
        isModalVisible && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={isModalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.separatorTop} />
                <Text style={styles.modalTitle}>Logout</Text>
                <View style={styles.separator} />
                <Text style={styles.modalMessage}>Are you sure you want to log out?</Text>
                <View style={styles.modalButtons}>
                  <ButtonComp
                    style={{ bgColor: "gray", width: "47%" }}
                    btnTitle="Cancel"
                    onPress={() => setModalVisible(false)} />
                  <ButtonComp
                    style={{ bgColor: "red", width: "47%" }}
                    btnTitle="Yes, Logout"
                    onPress={handleSignOut} />
                </View>
              </View>
            </View>
          </Modal>
        )
      }
      {
        firebaseError && (
          <View style={styles.error}>
            <Text style={{ color: Colors.error }}>{firebaseError}</Text>
          </View>
        )
      }
    </SafeAreaView >
  )
}