import React, { useState } from "react";
import BusinessPointsStore from "../stores/businessPoints";
import { View, TextInput, TouchableOpacity } from 'react-native';
import { observer } from "mobx-react-lite";
import { X } from "lucide-react-native";



export const SearchBlock = observer(({delay}) => {
  const [searchString, setSearchString] = useState(BusinessPointsStore.searchSrting)
  let timer;

  const rdelay = delay ? parseInt(delay) : 600;

  const onSearchHandler = (text) => {
    setSearchString(text)
    clearTimeout(timer)
    timer = setTimeout(() => {
      BusinessPointsStore.setSearchString(text?.trim())
    }, rdelay)
  }

  const clearInput = () => {
    setSearchString('')
    BusinessPointsStore.setSearchString('')
  }

  return (
    <View style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1A1A1A",
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: "#808080",
        paddingHorizontal: 10,
        height: 40,
        width: "95%",
    }}>
      <TextInput
        placeholder="Поиск"
        placeholderTextColor="#A9A9A9"
        cursorColor="#A9A9A9"
        onChangeText={onSearchHandler}
        autoCorrect={false}
        value={searchString}
        style={{
          color: "#A9A9A9",
          width: "95%",
        }}
      />
       {searchString.length > 0 && (
        <TouchableOpacity onPress={clearInput}>
          <X color="#A9A9A9" size={20} />
        </TouchableOpacity>
      )}

    </View>
  );
})