import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomSheet from 'src/components/base/BottomSheet';
import DateTimeCalendar from 'src/components/base/DateTimeCalendar';
import {DateTime} from 'src/components/base/utils';
import dimens from 'src/constants/dimens';

const convertDateObjToDateTime = (date: Date): DateTime => {
  return {
    id: `${date.getDate()}${date.getMonth()}${date.getFullYear()}`,
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear() - 2000,
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };
};
const convertDateTimeToDateObj = (datetime: DateTime): Date => {
  const date = new Date();
  date.setDate(datetime.day);
  date.setMonth(datetime.month - 1);
  date.setFullYear(datetime.year + 2000);
  date.setHours(datetime.hour);
  date.setMinutes(datetime.minute);
  date.setSeconds(datetime.second);
  return date;
};

const getCurrentListMonth = (margin: number): DateTime[] => {
  const currentDate = new Date();
  const result: DateTime[] = [];
  for (let i = 0; i < margin; i++) {
    const copyDate = new Date(currentDate.valueOf());
    copyDate.setMonth(copyDate.getMonth() + (i - margin));
    result.push(convertDateObjToDateTime(copyDate));
  }
  result.push(convertDateObjToDateTime(currentDate));
  return result;
};

const getMonthBefore = (dateTime: DateTime) => {
  const month1 = convertDateTimeToDateObj(dateTime);
  month1.setMonth(month1.getMonth() - 3);

  const month2 = convertDateTimeToDateObj(dateTime);
  month2.setMonth(month2.getMonth() - 2);

  const month3 = convertDateTimeToDateObj(dateTime);
  month3.setMonth(month3.getMonth() - 1);
  return [
    convertDateObjToDateTime(month1),
    convertDateObjToDateTime(month2),
    convertDateObjToDateTime(month3),
  ];
};

const CalendarOptionPopup = ({
  children,
  popUpRef,
  onDone,
  fromDate,
  toDate,
}: {
  children?: React.ReactElement;
  popUpRef?: React.RefObject<BottomSheet>;
  onDone?: (fromDate: Date, toDate: Date) => void;
  fromDate?: Date;
  toDate?: Date;
}): React.ReactElement => {
  const [originFromDate, setOriginFromDate] = useState<Date>(
    fromDate ? fromDate : new Date(),
  );
  const [originToDate, setOriginToDate] = useState<Date>(
    toDate ? toDate : new Date(),
  );

  const [calendarFromDate, setCalendarFromDate] = useState<Date>(
    fromDate ? fromDate : new Date(),
  );
  const [calendarToDate, setCalendarToDate] = useState<Date>(
    toDate ? toDate : new Date(),
  );
  return (
    <>
      {children &&
        React.cloneElement(children, {
          onPress: () => {
            children.props.onPress && children.props.onPress();
            popUpRef?.current?.show();
          },
        })}
      <BottomSheet
        ref={popUpRef}
        height={0.8 * dimens.deviceHeight}
        cancelable={false}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <DateTimeCalendar
            title="Từ ngày"
            value={calendarFromDate}
            maxDate={calendarToDate}
            onChange={(date) => {
              setCalendarFromDate(date);
            }}
          />
          <DateTimeCalendar
            title="Đến ngày"
            value={calendarToDate}
            minDate={calendarFromDate}
            onChange={(date) => {
              setCalendarToDate(date);
            }}
          />
        </ScrollView>
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={styles.cancelButtonContainer}
            onPress={() => {
              setCalendarFromDate(originFromDate);
              setCalendarToDate(originToDate);
              popUpRef?.current?.hide();
            }}>
            <Text style={{color: '#3D6AF8'}}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.doneButtonContainer}
            onPress={() => {
              setOriginFromDate(calendarFromDate);
              setOriginToDate(calendarToDate);
              popUpRef?.current?.hide();
              const fromDateReturn = new Date(new Date(calendarFromDate));
              fromDateReturn.setHours(0, 0, 0, 1);
              const toDateReturn = new Date(new Date(calendarToDate));
              toDateReturn.setHours(23, 59, 59, 1);

              onDone && onDone(fromDateReturn, toDateReturn);
            }}>
            <Text style={{color: 'white'}}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </>
  );
};

export default CalendarOptionPopup;

const styles = StyleSheet.create({
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cancelButtonContainer: {
    width: 120,
    height: 46,
    borderColor: '#3D6AF8',
    borderWidth: 1,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  doneButtonContainer: {
    width: 120,
    height: 46,
    backgroundColor: '#3D6AF8',
    borderColor: '#3D6AF8',
    borderWidth: 1,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
});
