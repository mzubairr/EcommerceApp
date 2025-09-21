import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './yourProfileStyles'
import { moderateScale } from 'react-native-size-matters'
import { Calendar, ChevronDown, ChevronLeft, ChevronUp } from 'lucide-react-native'
import { TextInput } from 'react-native'
import { useEffect, useState } from 'react'
import DatePicker from 'react-native-date-picker'
import ButtonComp from '../../../components/ButtonComp'
import Colors from '../../../constants/colors'
import { listenToUserProfile, saveUserProfile } from '../../../Services/Firebase/db'
import { getAuth } from '@react-native-firebase/auth';

export default function ProductOrder({ navigation }) {
    const [date, setDate] = useState(new Date());
    const [userName, setUserName] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedGender, setSelectedGender] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const getUserEmail = () => getAuth().currentUser?.email;

    const genders = ["Male", "Female"];

    const toggleDropdown = () => setIsOpen(!isOpen);

    const selectGender = (gender) => {
        setSelectedGender(gender);
        setIsOpen(false);
    };

    // Save profile
    const handleSave = async () => {
        await saveUserProfile(userName, date.toISOString(), selectedGender);
        Alert.alert("Saved", "Profile saved!");
    };

    // Listen to profile changes
    useEffect(() => {
        const unsub = listenToUserProfile((data) => {
            if (data) {
                setUserName(data.username || "");
                setDate(data.dob ? new Date(data.dob) : new Date());
                setSelectedGender(data.gender || "");
            }
        });

        return () => unsub();
    }, []);

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={moderateScale(24)} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Profile</Text>
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.TextInput}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        style={[styles.inputField, styles.inputTxt]}
                        placeholder="John Doe"
                        placeholderTextColor={Colors.txtSecondary}
                        value={userName}
                        onChangeText={setUserName} />
                </View>

                <View style={styles.TextInput}>
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput
                        editable={false}
                        style={[styles.inputField, styles.inputTxt]}
                        placeholder="john.doe@example.com"
                        placeholderTextColor={Colors.txtSecondary}
                        value={getUserEmail()} />
                </View>

                <View style={styles.TextInput}>
                    <Text style={styles.label}>Date of Birth</Text>
                    <TouchableOpacity style={styles.dropdown} onPress={() => setOpen(true)}>
                        <Text style={styles.inputTxt}>{date ? date.toLocaleDateString() : ""}</Text>
                        <Calendar size={moderateScale(24)} color={Colors.border} />
                    </TouchableOpacity>
                </View>

                <View style={styles.TextInput}>
                    <Text style={styles.label}>Gender:</Text>
                    <TouchableOpacity onPress={toggleDropdown}>
                        <View style={styles.dropdown}>
                            <Text style={styles.dropdownText}>
                                {selectedGender || "Select Gender"}
                            </Text>
                            {isOpen ?
                                <ChevronUp size={moderateScale(24)} color="#000" />
                                :
                                <ChevronDown size={moderateScale(24)} color="#000" />
                            }
                        </View>
                        {/* Dropdown options */}
                        {isOpen && (
                            <View style={styles.optionsContainer}>
                                {genders.map((gender, idx) => (
                                    <TouchableOpacity
                                        key={gender}
                                        style={[styles.option,
                                        idx % 2 === 0 &&
                                        {
                                            borderBottomLeftRadius: 0,
                                            borderBottomRightRadius: 0,
                                            borderBottomWidth: 0,
                                        },
                                        idx % 2 !== 0 &&
                                        {
                                            borderTopLeftRadius: 0,
                                            borderTopRightRadius: 0,
                                        },
                                        ]}
                                        onPress={() => selectGender(gender)}
                                    >
                                        <Text style={styles.optionText}>{gender}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            <ButtonComp onPress={handleSave} btnTitle="Saved" style={{
                bgColor: "#DAE2FF",
                btntxt2: Colors.disbaledBtn,
            }} />

            {/* Date Picker Modal */}
            <DatePicker
                modal
                open={open}
                date={date}
                mode="date"
                onConfirm={(date) => {
                    setOpen(false);
                    setDate(date);
                }}
                onCancel={() => setOpen(false)}
            />
        </SafeAreaView >
    );
}
