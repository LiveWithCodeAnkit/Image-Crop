import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface Props {
  label?: string;
  value: number;
  min: number;
  max: number;
  defaultValue: number;
  onChange(value: number): void;
}

export default function AppSlider({
  label,
  value,
  defaultValue,
  max,
  min,
  onChange,
}: Props) {
  const handleChange = (value: number | number[]) => {
    onChange(value as number);
  };
  return (
    <div>
      <p>{label}</p>
      <div className="p-2">
        <Slider
          onChange={handleChange}
          min={min}
          max={max}
          defaultValue={defaultValue}
          value={value}
          step={0.01}
        />
      </div>
    </div>
  );
}
