import React, {useCallback, useState} from 'react';
import {useMemo} from 'react';
import {useEffect} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';
import defaultStyles from 'src/common/styles';
import TimePicker from 'react-native-date-picker';
import colors from 'src/constants/colors';
import images from 'src/constants/images';
import i18n from 'src/locales/i18n';
import dayjs from 'dayjs';
import {checkIfDateIsInRange, DateTime} from './utils';
import {themeColors} from 'src/theme/theme';

const dayOfWeek = {
  MONDAY: i18n.t('common:Mo'),
  TUESDAY: i18n.t('common:Tu'),
  WEDNESDAY: i18n.t('common:We'),
  THURSDAY: i18n.t('common:Th'),
  FRIDAY: i18n.t('common:Fr'),
  SATURDAY: i18n.t('common:Sa'),
  SUNDAY: i18n.t('common:Su'),
};
enum ACTIVE {
  NEXT_MONTH = 1,
  PREV_MONTH = 2,
}
enum Month {
  January = 1,
  December = 12,
}

const componentText = {
  CANCEL: i18n.t('common:CANCEL'),
  OK: i18n.t('common:OK'),
  DAY: i18n.t('common:Day'),
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

interface Props {
  onChange?: (date: Date) => void;
  value?: Date;
  children?: React.ReactElement;
  mode?: 'date' | 'time' | 'datetime';
  minDate?: Date;
  maxDate?: Date;
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

const DatePicker = ({
  onChange,
  value,
  children,
  mode = 'date',
  minDate,
  maxDate,
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
  const [displayMode, setDisplayMode] = useState<'date' | 'time'>('date');
  useEffect(() => {
    setDisplayMode(mode === 'datetime' ? 'date' : mode);
  }, [mode]);

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
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    setViewDateTime(convertDateObjToDateTime(_value));
    setActiveDateTime(convertDateObjToDateTime(_value));
  }, [_value]);

  const [listYear] = useState<number[]>(() => {
    return Array.from(Array(2100 - 2000)).map((_, index) => index + 2000);
  });

  // century
  function calcCentury(y: number) {
    return Math.floor(y / 100);
  }
  // month
  function calcMonth(m: number) {
    if (m < 3) {
      return m + 10;
    } else {
      return m - 2;
    }
  }

  // year
  function calcYear(y: number) {
    return y % 100;
  }

  //  zeller
  function _zeller(day: number, month: number, year: number, century: number) {
    return (
      ((13 * month - 1) / 5 +
        year / 4 +
        century / 4 +
        day +
        year -
        2 * century) %
      7
    );
  }

  // ReWrite
  function zeller(d: number, m: number, y: number) {
    return _zeller(d, calcMonth(m), calcYear(y), calcCentury(y));
  }
  //
  //   const zweekday = zeller(12, 5, 2016); // = 4.600000000000001
  //   const weekday = Math.trunc(zweekday); // = 4
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

  function calendar(month: number, year: number) {
    const startIndex = Math.trunc(zeller(1, month, year));
    const endIndex = daysIn(month, year);
    const result = Array.apply(0, Array(42)).map(function () {
      return 0;
    });
    for (let i = startIndex; i < endIndex + startIndex; i++) {
      result[i] = i - startIndex + 1;
    }
    return result;
  }

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

  const onChangeTime = (time: Date) => {
    validateAndSetActiveDateTime(
      convertDateTimeToDateObj({
        ...activeDateTime,
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds(),
      }),
    );
  };

  const activeMonth = (nextMonth: number) => {
    switch (nextMonth) {
      case ACTIVE.NEXT_MONTH: {
        if (viewDateTime.month === Month.December) {
          setViewDateTime((prev) => ({
            ...prev,
            month: Month.January,
            year: prev.year + 1,
          }));
        } else {
          setViewDateTime((prev) => ({...prev, month: prev.month + 1}));
        }
        break;
      }
      case ACTIVE.PREV_MONTH: {
        if (viewDateTime.month === Month.January) {
          setViewDateTime((prev) => ({
            ...prev,
            month: Month.December,
            year: prev.year - 1,
          }));
        } else {
          setViewDateTime((prev) => ({...prev, month: prev.month - 1}));
        }
        break;
      }
      default:
        return;
    }
  };

  const formatMonthToString = (month: number) => {
    for (const item of listMonth) {
      if (item.num === month) {
        return item.name;
      }
    }
  };

  const renderDatePicker = () => {
    return (
      <>
        {/* Choose Time  */}
        {!editYear && (
          <View style={styles.tabDate}>
            <View style={styles.activeMonth}>
              <TouchableOpacity onPress={() => activeMonth(ACTIVE.PREV_MONTH)}>
                <Image style={styles.icon} source={images.ic_previous} />
              </TouchableOpacity>
              <View>
                <Text>
                  {formatMonthToString(viewDateTime.month)}{' '}
                  {viewDateTime.year + 2000}
                </Text>
              </View>
              <TouchableOpacity onPress={() => activeMonth(ACTIVE.NEXT_MONTH)}>
                <Image style={styles.icon} source={images.ic_next} />
              </TouchableOpacity>
            </View>
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
                    onPress={() => onChangeDay(day)}
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
        {/* Choose Year */}
        {editYear && (
          <View style={styles.tabDate}>
            <FlatList
              data={listYear}
              showsVerticalScrollIndicator={false}
              style={styles.maxHeight300}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => String(item)}
              renderItem={({item}) => {
                const year = item - 2000;
                const isBeforeMinYear = minDateTime
                  ? year < minDateTime.year
                  : false;
                const isAfterMinYear = maxDateTime
                  ? year > maxDateTime.year
                  : false;
                const isOutOfYearRange = isBeforeMinYear || isAfterMinYear;
                return (
                  <TouchableOpacity
                    activeOpacity={isOutOfYearRange ? 1 : 0.6}
                    style={[
                      defaultStyles.selfStretch,
                      defaultStyles.alignItemsCenter,
                    ]}
                    onPress={() => {
                      if (!isOutOfYearRange) {
                        setEditYear(false);
                        setViewDateTime((prev) => ({...prev, year}));
                      }
                    }}>
                    <Text
                      style={[
                        styles.textYear,
                        isOutOfYearRange && {color: themeColors.disabledText},
                      ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}
      </>
    );
  };

  const renderTimePicker = () => {
    return (
      <View style={defaultStyles.alignItemsCenter}>
        <TimePicker
          date={activeDateObj}
          onDateChange={onChangeTime}
          minimumDate={minDate}
          maximumDate={maxDate}
          mode="time"
        />
      </View>
    );
  };

  const renderTitle = () => {
    return (
      <View style={[styles.dateText]}>
        <TouchableOpacity
          onPress={() => {
            setEditYear(true);
            setDisplayMode('date');
          }}>
          <Text style={styles.infoYear}>{activeDateTime.year + 2000}</Text>
        </TouchableOpacity>
        <View style={[defaultStyles.row, defaultStyles.justifyBetween]}>
          <TouchableOpacity
            onPress={() => {
              setEditYear(false);
              setDisplayMode('date');
            }}>
            <Text style={styles.infoDayMonth}>
              {activeDateTime.day} {formatMonthToString(activeDateTime.month)}
            </Text>
          </TouchableOpacity>
          {mode !== 'date' && (
            <TouchableOpacity onPress={() => setDisplayMode('time')}>
              <Text style={styles.infoDayMonth}>
                {dayjs(activeDateObj).format('hh:mm A')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const data = calendar(viewDateTime.month, viewDateTime.year);
  return (
    <View style={styles.calendarTable}>
      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent
        statusBarTranslucent
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalView}>
            <TouchableWithoutFeedback onPress={undefined}>
              <View style={styles.backgroundDefault}>
                {renderTitle()}
                {displayMode === 'date' && renderDatePicker()}
                {displayMode === 'time' && renderTimePicker()}
                <View style={styles.bottomBtn}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                      setEditYear(false);
                    }}
                    style={[styles.dateBtn]}>
                    <Text style={styles.textBottom}>
                      {componentText.CANCEL}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                      setEditYear(false);
                      onChange?.(activeDateObj);
                    }}
                    style={[styles.dateBtn]}>
                    <Text style={styles.textBottom}> {componentText.OK} </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {children &&
        React.cloneElement(children, {
          onPress: () => {
            children.props.onPress && children.props.onPress();
            setModalVisible(true);
          },
        })}
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  calendarTable: {
    flex: 1,
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
  },
  listDate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // backgroundColor: 'yellow',
  },
  textDate: {
    color: 'black',
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
  },
  dateText: {
    backgroundColor: colors.color_EE0033,
    minWidth: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
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
    backgroundColor: colors.color_EE0033,
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
    paddingHorizontal: 20,
    borderRadius: 0,
    justifyContent: 'center',
    backgroundColor: 'rgba(10, 10, 18, 0.16)',
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
    color: colors.color_EE0033,
    fontWeight: 'bold',
  },
  maxHeight300: {
    maxHeight: 300,
  },
});
