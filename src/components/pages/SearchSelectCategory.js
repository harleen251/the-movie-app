import React from 'react';
import { Select, SelectTrigger, SelectInput, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem } from '@gluestack-ui/themed';

const SelectSearchCategory = ({ value, onValueChange, categories }) => {
  return (
    <Select value={value} onValueChange={onValueChange} style={{ flex: 1, paddingRight: '20px'}}>
      <SelectTrigger variant="outline" size="md">
        <SelectInput placeholder="Search Type" />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {categories.map((option) => (
            <SelectItem
              key={option.value}
              label={option.key}
              value={option.value}
            />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

export default SelectSearchCategory;
