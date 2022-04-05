import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import Swiper from 'react-native-swiper';
import BaseInput from '../base/BaseInput';
import colors from 'src/constants/colors';
import fonts from 'src/constants/fonts';
import {themeColors} from 'src/theme/theme';
import BottomSheet from '../base/BottomSheet';
import RadioButton from '../base/RadioButton/BaseRadioButton';
import {elevations} from 'src/common/styles/elevation';
import defaultStyles from 'src/common/styles';
import Toast from 'react-native-root-toast';
import {RootSiblingParent} from 'react-native-root-siblings';
import images from 'src/constants/images';
import Divider from '../base/Divider';
import Svgs from 'src/constants/Svgs';

type ValueType =
  | (Record<string | number, unknown> & {icon?: React.ReactNode})
  | undefined;

export interface ListItem {
  title?: string;
  lazyLoadData?: (prevStepChoice: ValueType | null) => Promise<ValueType[]>;
  data: ValueType[];
  placeholder?: string;
  itemText: string;
  description?: string;
  itemValue: string;
  returnObject?: boolean;
  scrollIndex?: number;
  showIcon?: boolean;
  enableChecked?: boolean;
  isCheckedItem?: string;
}

interface Props {
  data: ListItem[];
  display?: 'single' | 'stepped';
  value?: ValueType[];
  onFinish?: (data: ValueType[] | unknown[] | null) => void;
  children?: React.ReactElement;
  height?: number;
  searchable?: boolean;
  autoFinish?: boolean;
  keepPosition?: boolean;
  displayValue?: boolean;
  header?: boolean;
}

interface State {
  internalValue: ValueType[];
  filteredData: ListItem[];
  loading: boolean;
}

const MultipleChoiceBottomSheet = ({
  data = [],
  value = [],
  display = 'single',
  height = 250,
  searchable = false,
  autoFinish = false,
  keepPosition = false,
  displayValue = false,
  header = true,
  onFinish,
  children,
}: Props): React.ReactElement => {
  const [state, setState] = useState<State>({
    internalValue: [],
    filteredData: Array.from(data),
    loading: false,
  });
  const bottomSheetRef = useRef<BottomSheet>(null);
  const swiperRef = useRef<Swiper>(null);
  const searchText = useRef<string[]>([]);
  const originalData = useRef<ListItem[]>([]);

  const filterData = () => {
    const {internalValue} = state;
    return originalData.current?.map((listItem, index) => {
      let scrollIndex = 0;

      const filtered = listItem.data
        .filter((item) =>
          searchable && item
            ? String(item[listItem.itemText])
                .toLowerCase()
                .includes(
                  (searchText.current[index] || '').trim().toLowerCase(),
                )
            : true,
        )
        .map((item, itemIdx) => {
          scrollIndex =
            item &&
            item[listItem.itemValue] ===
              internalValue?.[index]?.[listItem.itemValue]
              ? itemIdx
              : scrollIndex;
          return item;
        });

      if (!keepPosition && filtered.length > scrollIndex) {
        const selected = filtered.splice(scrollIndex, 1)[0];
        filtered.unshift(selected);
      }
      return {...listItem, data: filtered, scrollIndex};
    });
  };

  useEffect(() => {
    originalData.current = data;
    setState((prev) => ({
      ...prev,
      filteredData: filterData(),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const loadAsyncData = async (
    prevValueChoice: ValueType | null,
    index: number,
  ) => {
    setState((prev) => ({...prev, loading: true}));
    if (data[index] && typeof data[index].lazyLoadData === 'function') {
      const loadedData = await data[index]?.lazyLoadData?.(prevValueChoice);
      originalData.current[index] = {
        ...originalData.current[index],
        data: loadedData || [],
      };
    }
    setState((prev) => ({...prev, loading: false}));
  };

  const selectionValue = useRef<{selectedItem?: ValueType; index?: number}>({});
  const onSelectItem = (selectedItem: ValueType, index: number) => {
    selectionValue.current = {selectedItem, index};
    setState((prev) => {
      const itemValue = state.filteredData?.[index].itemValue;
      const internalValue = Array.from(prev.internalValue);
      internalValue[index] = state.filteredData[index].data.find(
        (item) => item?.[itemValue] === selectedItem?.[itemValue],
      );
      return {...prev, internalValue};
    });
  };
  useEffect(() => {
    if (
      selectionValue.current.selectedItem &&
      selectionValue.current.index !== undefined
    ) {
      loadAsyncData(
        selectionValue.current.selectedItem,
        selectionValue.current.index + 1,
      ).then(() => {
        setState((prev) => ({...prev, filteredData: filterData()}));
        if (selectionValue.current.index !== data.length - 1) {
          swiperRef?.current?.scrollBy?.(1, true);
        } else if (autoFinish) {
          _onFinish(
            display === 'single' ? [selectionValue.current.selectedItem] : null,
          );
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.internalValue]);

  const swipeForward = (index: number) => {
    swiperRef?.current?.scrollBy?.(1, true);
    onSelectItem(state.internalValue[index], index);
  };

  const swipeBack = () => {
    return () => {
      swiperRef?.current?.scrollBy?.(-1, true);
    };
  };

  const onClose = () => {
    swiperRef?.current?.scrollTo?.(0, true);
    selectionValue.current = {};
    setState((prev) => ({
      ...prev,
      internalValue: [...value],
    }));

    loadAsyncData(null, 0).then(() =>
      setState((prev) => ({...prev, filteredData: filterData()})),
    );
  };

  const onOpen = () => {
    setState((prev) => ({
      ...prev,
      internalValue: [...value],
    }));
    loadAsyncData(null, 0).then(() =>
      setState((prev) => ({...prev, filteredData: filterData()})),
    );
  };

  const _onFinish = (finalValue: ValueType[] | null = null) => {
    const _value = finalValue || state.internalValue;
    const returnValue = data?.map((listItem, index) => {
      if (listItem.returnObject) {
        return _value?.[index];
      } else {
        return _value?.[index]?.[listItem.itemValue];
      }
    });
    onFinish?.(returnValue);
    bottomSheetRef?.current?.hide?.();
    searchText.current = [];
  };

  const finishEnabled = () => {
    return (
      state.internalValue.length === data?.length &&
      state.internalValue.reduce((res, v) => res && !!v, true)
    );
  };

  const handleSearch = (text: string, index: number) => {
    searchText.current[index] = text;
    setState((prev) => ({...prev, filteredData: filterData()}));
  };

  const showToastError = () => {
    Toast.show('Chưa có giá trị nào được chọn');
  };

  const onPressNext = (index: number, pageData: ListItem) => {
    if (
      state.internalValue[index]?.[pageData.itemValue] &&
      state.filteredData[index]?.data?.findIndex(
        (item) =>
          item?.[pageData.itemValue] ===
          state.internalValue[index]?.[pageData.itemValue],
      ) >= 0
    ) {
      if (index === data.length - 1) {
        _onFinish();
      } else {
        swipeForward(index);
      }
    } else {
      showToastError();
    }
  };

  const renderSearchInput = (index: number) => {
    return (
      <BaseInput
        name="search"
        containerStyle={styles.inputSearch}
        editable={true}
        leftIcon={<Image source={images.ic_search} style={styles.searchIcon} />}
        maxLength={150}
        placeholder={data[index]?.placeholder || ''}
        value={searchText.current[index]}
        placeholderTextColor={'#C8C8CA'}
        onChangeText={(text) => handleSearch(text, index)}
      />
    );
  };

  const renderSingleSheet = () => {
    const singleList = state.filteredData.length === 1;
    return (
      <>
        {singleList && header && (
          <>
            <View style={[styles.row, styles.justifySpaceBetween]}>
              <Text style={[styles.title]}>{state.filteredData[0].title}</Text>
              {!autoFinish && (
                <TouchableOpacity
                  style={styles.actionButton}
                  disabled={!finishEnabled()}
                  onPress={() => _onFinish()}>
                  <Text
                    style={
                      finishEnabled()
                        ? styles.actionText
                        : styles.disabledActionText
                    }>
                    {'Xong'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            {searchable && renderSearchInput(0)}
          </>
        )}
        {!singleList && header && !autoFinish && (
          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonFinish]}
            disabled={!finishEnabled()}
            onPress={() => _onFinish()}>
            <Text
              style={
                finishEnabled() ? styles.actionText : styles.disabledActionText
              }>
              {'Xong'}
            </Text>
          </TouchableOpacity>
        )}
        {state.filteredData.reduce(
          (acc, listItem) => acc + listItem.data.length,
          0,
        ) === 0 ? (
          <View style={styles.emptyView} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            {state.filteredData
              .filter((listItem) => listItem.data.length > 0)
              .map((listItem, index) => (
                <View style={defaultStyles.pt_2} key={index}>
                  {!singleList && header && (
                    <View style={[styles.row, styles.justifySpaceBetween]}>
                      <Text style={styles.title}>{listItem.title}</Text>
                    </View>
                  )}
                  {listItem.data?.map((item, itemIndex) => (
                    <View
                      key={String(item?.[listItem.itemValue])}
                      style={[
                        defaultStyles.row,
                        defaultStyles.alignItemsCenter,
                      ]}>
                      {listItem.showIcon &&
                        item !== undefined &&
                        Boolean(item.icon) && (
                          <View
                            style={[
                              styles.choiceIconContainer,
                              defaultStyles.centeredItem,
                            ]}>
                            {item !== undefined &&
                              Boolean(item.icon) &&
                              item.icon}
                          </View>
                        )}
                      <View style={[defaultStyles.flex_1]}>
                        <TouchableOpacity
                          style={[
                            styles.row,
                            styles.alignCenter,
                            styles.choiceButton,
                            listItem.enableChecked && {marginBottom: 6},
                            !listItem.showIcon && defaultStyles.ml_3,
                          ]}
                          onPress={() => onSelectItem(item, index)}>
                          {!listItem.showIcon && !listItem.enableChecked && (
                            <RadioButton
                              color={colors.color_4353FA}
                              onPress={() => onSelectItem(item, index)}
                              status={
                                state.internalValue?.[index]?.[
                                  listItem.itemValue
                                ] === item?.[listItem.itemValue]
                                  ? 'checked'
                                  : 'unchecked'
                              }
                            />
                          )}
                          <Text
                            style={[styles.choiceText, {paddingHorizontal: 5}]}>
                            {item !== undefined &&
                              String(item[listItem.itemText])}
                            <Text
                              style={[
                                styles.descriptionText,
                                {paddingHorizontal: 5},
                              ]}>
                              {item !== undefined &&
                                listItem.description !== undefined &&
                                String(item[listItem.description])}
                            </Text>
                          </Text>
                          {listItem.enableChecked &&
                            item !== undefined &&
                            listItem.isCheckedItem !== undefined &&
                            String(item[listItem.isCheckedItem]) === `true` && (
                              <View>
                                <Svgs.Checked width={14} height={14} />
                              </View>
                            )}
                        </TouchableOpacity>
                        {itemIndex !== listItem.data?.length - 1 && (
                          <Divider color={'#C8C8CA'} lineSize={1} stretch />
                        )}
                      </View>
                    </View>
                  ))}
                </View>
              ))}
            <View style={styles.mb_24} />
          </ScrollView>
        )}
      </>
    );
  };

  const renderPage = (pageData: ListItem, index: number) => {
    return (
      <View
        style={styles.flex_1}
        key={String(state.internalValue[index]?.[pageData.itemValue])}>
        {header && (
          <View style={[styles.row, styles.justifySpaceBetween]}>
            {index !== 0 ? (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={swipeBack()}>
                <Text style={styles.actionText}>{'Trước'}</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.actionButton} />
            )}
            <View style={styles.flex_1}>
              <Text style={styles.title}>
                {index === 0 || !displayValue
                  ? pageData.title
                  : String(
                      state.internalValue?.[index - 1]?.[
                        data?.[index - 1]?.itemText
                      ],
                    )}
              </Text>
            </View>
            <View style={styles.actionButton}>
              {index === data.length - 1 && !autoFinish && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => onPressNext(index, pageData)}>
                  <Text style={styles.actionText}>{'Xong'}</Text>
                </TouchableOpacity>
              )}
              {index !== data.length - 1 && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => onPressNext(index, pageData)}>
                  <Text style={styles.actionText}>{'Tiếp'}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        {searchable && renderSearchInput(index)}
        {pageData.data.length !== 0 ? (
          <FlatList
            data={pageData.data}
            keyExtractor={(item) => String(item?.[pageData.itemValue])}
            renderItem={({item, index: itemIndex}) => {
              return (
                <View
                  style={[defaultStyles.row, defaultStyles.alignItemsCenter]}>
                  {pageData.showIcon && (
                    <View
                      style={[
                        styles.choiceIconContainer,
                        defaultStyles.centeredItem,
                      ]}>
                      {item !== undefined && Boolean(item.icon) && item.icon}
                    </View>
                  )}
                  <View style={[defaultStyles.flex_1]}>
                    <TouchableOpacity
                      key={String(item?.[pageData.itemValue])}
                      style={[
                        styles.row,
                        styles.alignCenter,
                        styles.choiceButton,
                        !pageData.showIcon && defaultStyles.ml_3,
                      ]}
                      onPress={() => onSelectItem(item, index)}>
                      <RadioButton
                        color={colors.color_4353FA}
                        onPress={() => onSelectItem(item, index)}
                        status={
                          item?.[pageData.itemValue] ===
                          state.internalValue?.[index]?.[pageData.itemValue]
                            ? 'checked'
                            : 'unchecked'
                        }
                      />
                      <Text style={styles.choiceText}>
                        {String(item?.[pageData.itemText])}
                      </Text>
                    </TouchableOpacity>
                    {itemIndex !== pageData.data.length - 1 && (
                      <Divider color={'#C8C8CA'} lineSize={1} stretch />
                    )}
                  </View>
                </View>
              );
            }}
          />
        ) : (
          <View style={[styles.flex_1, styles.bgWhite]}>
            {state.loading ? (
              <ActivityIndicator
                style={styles.flex_1}
                color={colors.color_4353FA}
              />
            ) : (
              <View style={styles.emptyView} />
            )}
          </View>
        )}
      </View>
    );
  };

  const renderSteppedSheets = () => {
    return (
      <Swiper
        ref={swiperRef}
        autoplay={false}
        showsButtons={false}
        showsPagination={false}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        loop={false}>
        {state.filteredData?.map((listItem, index) => {
          return renderPage(listItem, index);
        })}
      </Swiper>
    );
  };

  return (
    <>
      {children &&
        React.cloneElement(children, {
          onPress: () => {
            children.props.onPress && children.props.onPress();
            bottomSheetRef?.current?.show();
          },
        })}
      <BottomSheet
        ref={bottomSheetRef}
        height={height}
        onClose={onClose}
        onOpen={onOpen}
        style={styles.container}>
        {display && display === 'single' && renderSingleSheet()}
        {display && display === 'stepped' && renderSteppedSheets()}
        <RootSiblingParent>{}</RootSiblingParent>
      </BottomSheet>
    </>
  );
};

export default MultipleChoiceBottomSheet;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'stretch',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  row: {
    flexDirection: 'row',
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
  alignCenter: {
    alignItems: 'center',
  },
  inputSearch: {
    margin: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderColor: colors.color_C8C8CA,
    borderWidth: 0.5,
    borderRadius: 24,
    ...elevations[1],
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.color_0A0A12,
    paddingTop: Platform.OS === 'ios' ? 4 : 0,
    textAlign: 'center',
    flex: 1,
  },
  actionButton: {
    paddingHorizontal: 16,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: themeColors.primary,
  },
  actionButtonFinish: {
    position: 'absolute',
    top: 24,
    right: 0,
    zIndex: 10,
  },
  disabledActionText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.color_929295,
  },
  choiceButton: {
    alignSelf: 'stretch',
    paddingVertical: 8,
    marginRight: 16,
  },
  choiceText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: '#333',
    marginLeft: 8,
    paddingTop: 4,
    flex: 1,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: '#707070',
    marginLeft: 8,
    paddingTop: 4,
    flex: 1,
  },
  choiceIcon: {
    height: 23,
    width: 23,
  },
  choiceIconContainer: {
    width: 48,
    height: 48,
  },
  searchIcon: {width: 18, height: 18},
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mb_24: {
    marginBottom: 24,
  },
  flex_1: {
    flex: 1,
  },
  bgWhite: {
    backgroundColor: 'white',
  },
});
