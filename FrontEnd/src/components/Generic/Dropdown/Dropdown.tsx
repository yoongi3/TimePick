import { CSSProperties } from "styled-components";

type Option = {
    value: number;
    label: string;
}

type Props = {
    options: Option[];
    name: string;
    value: number;
    handleValueSelect: React.ChangeEventHandler<HTMLSelectElement>
    style?: CSSProperties;
}

const Dropdown = ({ options, name, value, handleValueSelect, style}: Props) => {
    
    return(
        <label>
            <select name={name} style={style} value={value} onChange={handleValueSelect}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
            </select>
        </label>
    )
}

export default Dropdown