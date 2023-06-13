import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import {
  TextInput,
  Button,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import moment from "moment";
//import { TouchableWithoutFeedback } from "react-native-web";
import { FontAwesome5 } from "react-native-vector-icons";
import {
  useNavigation,
  useIsFocused,
  StackActions,
} from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { LoginAndRegister } from "./Login";

const Planner = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const isFocused = useIsFocused();
  const userData = useSelector((state) => state.user.userInfo);

  const handleDayPress = (date) => {
    setSelectedDate(date.dateString);
    const existingNote = notes.find((n) => n.date === date.dateString);
    if (existingNote) {
      setNote(existingNote.note);
    } else {
      setNote("");
    }
  };

  const handleSaveNote = () => {
    if (selectedDate) {
      const existingNoteIndex = notes.findIndex((n) => n.date === selectedDate);
      if (existingNoteIndex > -1) {
        const updatedNotes = [...notes];
        updatedNotes[existingNoteIndex].note = note;
        setNotes(updatedNotes);
      } else {
        setNotes([...notes, { date: selectedDate, note }]);
      }
    }
    Keyboard.dismiss(); // dismiss the keyboard
    setNote("");
  };

  const getFormattedDate = (date) => moment(date).format(" MMMM Do YYYY");
  const getFormattedTime = (date) => moment(date).format("h:mm A");

  const renderNoteItem = ({ item }) => (
    <View style={styles.notesAfterTyping}>
      <Text style={{ color: "black" }}>{getFormattedDate(item.date)}|</Text>
      <Text style={{ padding: 10 }}>{item.note}</Text>
    </View>
  );

  const notesForSelectedDate = notes.filter((n) => n.date === selectedDate);
  const otherNotes = notes.filter((n) => n.date !== selectedDate);
  if (!userData && isFocused) {
    return <LoginAndRegister />;
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginRight: 10,
            marginLeft: 10,
          }}
        >
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome5 name="arrow-left" size={30} color="#f6437b" />
          </TouchableOpacity>
          <Text style={{ color: "#f6437b", fontWeight: "700", fontSize: 18 }}>
            Events
          </Text>
          <FontAwesome5 name="arrow-left" size={30} color="white" />
        </View>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: "#6C63FF" },
          }}
          style={{
            borderColor: "#ffff",
            borderWidth: 1,
            borderRadius: 8,
            elevation: 2,
            margin: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 2.84,
          }}
          theme={{
            calendarBackground: "#ffff",
            textSectionTitleColor: "#b6c1cd",
            selectedDayBackgroundColor: "#ffff",
            selectedDayTextColor: "#ffff",
            todayTextColor: "red",
            todayTextBackground: "#ffff",
            dayTextColor: "#2d4150",
            textDisabledColor: "#d9e1e8",
            dotColor: "#00adf5",
            selectedDotColor: "#ffffff",
            arrowColor: "red",
            monthTextColor: "black",
            // textDayFontFamily: "monospace",
            // textMonthFontFamily: "monospace",
            // textDayHeaderFontFamily: "monospace",
            textDayFontSize: 18,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
        />
        <View>
          <Text style={styles.titleNotesText}>Record an Event</Text>
          <TextInput
            label="Events"
            value={note}
            placeholder="Write your event here"
            onChangeText={setNote}
            style={styles.notesInput}
            multiline
            numberOfLines={4}
          />
          <View
            style={{
              backgroundColor: "#f6437b",
              borderRadius: 10,
              margin: 10,
            }}
          >
            <Button
              mode="contained"
              onPress={handleSaveNote}
              color="#ffff"
              // lableStyle={{ backgroundColor: "blue" }}
              title="Save Event"
            />
          </View>

          {/* {notesForSelectedDate.length > 0 && ( */}

          <View style={styles.notesContainer}>
            <Text style={styles.titleNotesText}>Today's Event:</Text>
            {notesForSelectedDate.length === 0 ? (
              <Text style={styles.todayNotes}>No events for today yet</Text>
            ) : (
              <FlatList
                scrollEnabled={true}
                data={notesForSelectedDate}
                renderItem={renderNoteItem}
                keyExtractor={(item) => item.date}
                style={styles.notesList}
              />
            )}
          </View>

          <View style={styles.notesContainer}>
            <Text style={styles.titleNotesText}>Other Events:</Text>
            <FlatList
              scrollEnabled={true}
              data={otherNotes}
              renderItem={renderNoteItem}
              keyExtractor={(item) => item.date}
              style={styles.notesList}
            />
          </View>

          {/* )} */}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  calendarContainer: {
    flex: 0.4,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    //padding: 20,
    // margin: 20,
  },
  // notesContainer: {
  //   // flex: 0.6,
  //   backgroundColor: "#FFFFFF",
  //   borderRadius: 5,
  //   padding: 10,
  //   margin: 10,
  //   //marginBottom: 40,
  // },
  notesInput: {
    height: 50,
    margin: 10,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    // color: "#f6437b",
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    textAlignVertical: "top",
  },
  // saveButton: {
  //   backgroundColor: "#1C75BC",
  //   marginTop: 10,
  //   borderRadius: 10,
  //   height: 50,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  notesListContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  notesListHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#555555",
    marginBottom: 10,
  },
  // notesList: {
  //   top: 5,
  // },
  notesListDate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1C75BC",
    marginBottom: 5,
  },
  notesListNote: {
    fontSize: 16,
    color: "#555555",
  },
  noNotesContainer: {
    backgroundColor: "#F2F2F2",
  },
  // titleNotesText: {
  //   fontSize: 16,
  //   fontWeight: "bold",
  // },
  notesAfterTyping: {
    //flex: 1,
    backgroundColor: "#F2F2F2",
    // marginTop: 10,
    borderRadius: 5,
  },
  // todayNotes: {
  //   backgroundColor: "#00FF00",
  // },
  notesContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
  },
  titleNotesText: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
  todayNotes: {
    fontStyle: "italic",
    margin: 10,
  },
  notesList: {
    //flex: 1,
    maxHeight: 150,
  },
});

export default Planner;
