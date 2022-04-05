import React, {useCallback, useState} from 'react';
import {useMemo} from 'react';
import {useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import defaultStyles from 'src/common/styles';
import colors from 'src/constants/colors';
import i18n from 'src/locales/i18n';
import {checkIfDateIsInRange, DateTime} from './utils';
import Svgs from 'src/constants/Svgs';
import {themeColors} from 'src/theme/theme';
import CustomWheelPicker from '../WheelPicker';

const dayOfWeek = {
  MONDAY: i18n.t('common:Mo'),
  TUESDAY: i18n.t('common:Tu'),
  WEDNESDAY: i18n.t('common:We'),
  THURSDAY: i18n.t('common:Th'),
  FRIDAY: i18n.t('common:Fr'),
  SATURDAY: i18n.t('common:Sa'),
  SUNDAY: i18n.t('common:Su'),
};

const listMonth = [
  {
    name: i18n.t('common:January'),
    num: 1,
  },
  {
    name: i18n.t('common:February'),
    num: 2,
  },
  {
    name: i18n.t('common:March'),
    num: 3,
  },
  {
    name: i18n.t('common:April'),
    num: 4,
  },
  {
    name: i18n.t('common:May'),
    num: 5,
  },
  {
    name: i18n.t('common:June'),
    num: 6,
  },
  {
    name: i18n.t('common:July'),
    num: 7,
  },
  {
    name: i18n.t('common:August'),
    num: 8,
  },
  {
    name: i18n.t('common:September'),
    num: 9,
  },
  {
    name: i18n.t('common:October'),
    num: 10,
  },
  {
    name: i18n.t('common:November'),
    num: 11,
  },
  {
    name: i18n.t('common:December'),
    num: 12,
  },
];

const listYear = () => {
  const year = new Date().getFullYear();
  const result: {name: string; num: number}[] = [];
  for (let i = year - 60; i < year + 40; i++) {
    result.push({name: i18n.t(`Năm ${i}`), num: i});
  }
  return result;
};

interface Props {
  onChange?: (date: Date) => void;
  value: Date;
  children?: React.ReactElement;
  mode?: 'date' | 'time' | 'datetime';
  minDate?: Date;
  maxDate?: Date;
  title?: string;
}

const convertDateObjToDateTime = (date: Date): DateTime => {
  return {
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

const DateTimeCalendar = ({
  onChange,
  mode = 'date',
  title,
  minDate,
  maxDate,
  value,
}: Props): React.ReactElement => {
  const [editYear, setEditYear] = useState(false);
  const minDateTime = useMemo<DateTime | undefined>(
    () => minDate && convertDateObjToDateTime(minDate),
    [minDate],
  );
  const maxDateTime = useMemo<DateTime | undefined>(
    () => maxDate && convertDateObjToDateTime(maxDate),
    [maxDate],
  );

  const _value = useMemo(() => {
    if (value instanceof Date && !isNaN(value.getTime())) {
      if (minDate && value < minDate) {
        return minDate;
      } else if (maxDate && value > maxDate) {
        return maxDate;
      } else {
        return value;
      }
    } else {
      return new Date();
    }
  }, [maxDate, minDate, value]);

  const [viewDateTime, setViewDateTime] = useState<DateTime>(
    convertDateObjToDateTime(_value),
  );
  const [activeDateTime, setActiveDateTime] = useState<DateTime>(
    convertDateObjToDateTime(_value),
  );
  const validateAndSetActiveDateTime = useCallback(
    (dateObj: Date) => {
      if (minDate && dateObj < minDate && minDateTime) {
        setActiveDateTime(minDateTime);
      } else if (maxDate && dateObj > maxDate && maxDateTime) {
        setActiveDateTime(maxDateTime);
      } else {
        setActiveDateTime(convertDateObjToDateTime(dateObj));
      }
    },
    [maxDate, maxDateTime, minDate, minDateTime],
  );
  const activeDateObj = useMemo<Date>(
    () => convertDateTimeToDateObj(activeDateTime),
    [activeDateTime],
  );
  const [displayMode, setDisplayMode] = useState<'date' | 'time'>('date');
  useEffect(() => {
    setDisplayMode(mode === 'datetime' ? 'date' : mode);
  }, [mode]);

  const [listYearPopup] = useState<{name: string; num: number}[]>(() => {
    return listYear();
  });

  const [visibleWheel, setVisibleWheel] = useState(false);

  const getMonthIndex = useCallback((month: number) => {
    return listMonth.findIndex((item) => item.num === month);
  }, []);

  const getYearIndex = useCallback(
    (year: number) => {
      return listYearPopup.findIndex((item) => item.num === year);
    },
    [listYearPopup],
  );

  function isLeap(year: number) {
    if (year % 4 || (year % 100 === 0 && year % 400)) {
      return 0;
    } else {
      return 1;
    }
  }
  function daysIn(month: number, year: number) {
    return month === 2 ? 28 + isLeap(year) : 31 - (((month - 1) % 7) % 2);
  }

  const calendar = useCallback((month: number, year: number) => {
    const getMonthString = month < 10 ? `0${month}` : `${month}`;
    const startIndex = new Date(
      year + 2000 + '-' + getMonthString + '-01',
    ).getDay();
    // const startIndex = Math.trunc(zeller(1, month, year));
    const endIndex = daysIn(month, year);
    const result = Array.apply(0, Array(35)).map(function () {
      return 0;
    });
    for (let i = startIndex; i < endIndex + startIndex; i++) {
      result[i] = i - startIndex + 1;
    }
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatMonthToString = (month: number) => {
    for (const item of listMonth) {
      if (item.num === month) {
        return item.name;
      }
    }
  };
  const onChangeDay = (newDay: number) => {
    if (!newDay) {
      return;
    }
    setViewDateTime((prev) => ({...prev, day: newDay}));
    validateAndSetActiveDateTime(
      convertDateTimeToDateObj({
        ...activeDateTime,
        day: newDay,
        month: viewDateTime.month,
        year: viewDateTime.year,
      }),
    );
  };
  const data = calendar(viewDateTime.month, viewDateTime.year);

  const renderDatePicker = () => {
    return (
      <>
        {/* Choose Time  */}
        {!editYear && (
          <View style={styles.tabDate}>
            <View style={[styles.titleCalendar]}>
              <View style={[styles.itemDay]}>
                <Text>{dayOfWeek.SUNDAY}</Text>
              </View>
              <View style={[styles.itemDay]}>
                <Text>{dayOfWeek.MONDAY}</Text>
              </View>
              <View style={[styles.itemDay]}>
                <Text>{dayOfWeek.TUESDAY}</Text>
              </View>
              <View style={[styles.itemDay]}>
                <Text>{dayOfWeek.WEDNESDAY}</Text>
              </View>
              <View style={[styles.itemDay]}>
                <Text>{dayOfWeek.THURSDAY}</Text>
              </View>
              <View style={[styles.itemDay]}>
                <Text>{dayOfWeek.FRIDAY}</Text>
              </View>
              <View style={[styles.itemDay]}>
                <Text>{dayOfWeek.SATURDAY}</Text>
              </View>
            </View>
            <View style={styles.listDate}>
              {data?.map((day: number, index: number) => {
                const isBeforeMinOfAfterMax = checkIfDateIsInRange(
                  minDateTime,
                  maxDateTime,
                  {
                    ...viewDateTime,
                    day,
                  },
                );

                return (
                  <TouchableOpacity
                    onPress={() => {
                      onChangeDay(day);
                      onChange &&
                        onChange(
                          convertDateTimeToDateObj({
                            ...activeDateTime,
                            day,
                            month: viewDateTime.month,
                            year: viewDateTime.year,
                          }),
                        );
                    }}
                    disabled={isBeforeMinOfAfterMax}
                    activeOpacity={isBeforeMinOfAfterMax ? 1 : 0.6}
                    style={styles.itemDay}
                    key={index}>
                    {day === activeDateTime.day &&
                    viewDateTime.month === activeDateTime.month &&
                    viewDateTime.year === activeDateTime.year ? (
                      <View
                        style={[
                          styles.centeredView,
                          styles.textChooseContainer,
                          styles.backgroundActive,
                        ]}>
                        <Text style={styles.textChoose}>
                          {day !== 0 && day}
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={[
                          styles.centeredView,
                          styles.textChooseContainer,
                          styles.backgroundDefault,
                        ]}>
                        <Text
                          style={[
                            styles.textDate,
                            isBeforeMinOfAfterMax && {
                              color: themeColors.disabledText,
                            },
                          ]}>
                          {day !== 0 && day}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </>
    );
  };

  const renderTitle = () => {
    return (
      <View style={[styles.dateText]}>
        {title && (
          <Text style={{fontSize: 16, color: 'black', marginBottom: 8}}>
            {title}
          </Text>
        )}
        <TouchableOpacity
          onPress={() => setVisibleWheel(true)}
          style={[
            defaultStyles.row,
            defaultStyles.justifyBetween,
            {alignItems: 'center'},
          ]}>
          <Svgs.IcDatetime />
          <Text
            style={{
              marginHorizontal: 5,
              color: '#000000',
            }}>{`${formatMonthToString(viewDateTime.month)} năm ${
            viewDateTime.year + 2000
          }`}</Text>
          <Svgs.ArrowEnable />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.calendarTable}>
      <View style={styles.modalView}>
        <TouchableWithoutFeedback onPress={() => setVisibleWheel(false)}>
          <View style={styles.backgroundDefault}>
            {renderTitle()}
            {renderDatePicker()}
            <Modal visible={visibleWheel} transparent={true}>
              <TouchableWithoutFeedback onPress={() => setVisibleWheel(false)}>
                <View style={styles.monthYearPopupContainer}>
                  <TouchableWithoutFeedback onPress={undefined}>
                    <View style={styles.wheelPicker}>
                      <CustomWheelPicker
                        listItem={listMonth}
                        onValueChange={(value) =>
                          setViewDateTime((prev) => ({
                            ...prev,
                            month: value.num as number,
                          }))
                        }
                        initSelectedIndex={getMonthIndex(viewDateTime.month)}
                        valueKeyExtractor={'name'}
                      />
                      <CustomWheelPicker
                        initSelectedIndex={getYearIndex(
                          viewDateTime.year + 2000,
                        )}
                        onValueChange={(value) =>
                          setViewDateTime((prev) => ({
                            ...prev,
                            year: (value.num as number) - 2000,
                          }))
                        }
                        listItem={listYearPopup}
                        valueKeyExtractor={'name'}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default DateTimeCalendar;

const styles = StyleSheet.create({
  calendarTable: {
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  titleCalendar: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
  },
  itemDay: {
    flexBasis: '14.2%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#3D6AF8',
  },
  listDate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // backgroundColor: 'yellow',
  },
  textDate: {
    color: '#3D6AF8',
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
  },
  dateText: {
    minWidth: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // flexBasis:'100%',
  },
  activeMonth: {
    // position: 'absolute',
    // right: 10,
    padding: 20,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    height: 20,
    width: 20,
    tintColor: '#212121',
  },
  infoDayMonth: {
    fontSize: 25,
    color: '#fff',
  },
  infoYear: {
    color: 'white',
    fontSize: 17,
  },
  backgroundActive: {
    backgroundColor: colors.color_common,
  },
  backgroundDefault: {
    backgroundColor: '#FFF',
  },
  textChooseContainer: {
    borderRadius: 15,
    width: 30,
    height: 30,
  },
  textChoose: {
    color: '#fff',
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
  },
  centeredView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    // marginTop: 30,
    backgroundColor: '#fff',
  },
  modalView: {
    flex: 1,
    borderRadius: 0,
    justifyContent: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  bottomBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  dateBtn: {
    padding: 10,
  },
  tabDate: {
    // height: 300,
    minWidth: 300,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  itemYear: {
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textYear: {
    fontSize: 16,
    paddingVertical: 16,
  },
  cardPicker: {
    borderWidth: 1,
    borderRadius: 14,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  imgIcon: {
    width: 18,
    height: 18,
  },
  textPickerDate: {
    marginLeft: 12,
  },
  textBottom: {
    color: colors.color_common,
    fontWeight: 'bold',
  },
  maxHeight300: {
    maxHeight: 300,
  },
  monthYearPopupContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(112,112,112,0.6)',
  },
  wheelPicker: {
    backgroundColor: 'white',
    width: '90%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
  },
});
