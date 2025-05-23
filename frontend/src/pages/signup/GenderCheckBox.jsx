import React from 'react';
import { Checkbox } from "@/components/ui/checkbox"

const GenderCheckBox = ({ onCheckBoxChange, selectedGender }) => {
    return (
        <div className="ml-[5px] h-[10px] flex items-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
                <Checkbox
                    id="male"
                    checked={selectedGender === "male"}
                    onCheckedChange={() => onCheckBoxChange("male")}
                />
                <label htmlFor="male" className="text-[16px] text-gray-700">
                    Male
                </label>
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox
                    id="female"
                    checked={selectedGender === "female"}
                    onCheckedChange={() => onCheckBoxChange("female")}
                />
                <label htmlFor="female" className="text-[16px] text-gray-700">
                    Female
                </label>
            </div>
        </div>
    );
};

export default GenderCheckBox;
