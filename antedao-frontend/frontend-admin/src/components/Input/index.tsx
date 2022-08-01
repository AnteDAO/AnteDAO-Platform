import { Component } from "react";
import {
	TextField,
	TextFieldProps,
	Input,
	InputAdornment,
} from "@material-ui/core";

const formatNumber = (price?: number | string, defaultValue?: any) => {
	if ((price && Number(price)) || price === 0) {
		return Intl.NumberFormat("en-US").format(Number(price));
	}
	return defaultValue || price;
};

interface IProps {
	defaultValue?: string | number;
	value?: string | number;
	type?: "text" | "number";
	onChange?: (v: string) => any;
	min?: number;
	max?: number;
	fixed?: number;
	endAdorn?: any;
	error?: any;
	decimal?: number;
}

interface IState {
	value?: string | number;
	valueLast?: string;
	valueFirst?: string;
}

class FieldInput extends Component<IProps & TextFieldProps, IState> {
	constructor(props: IProps & TextFieldProps) {
		super(props);
		const { defaultValue, value, fixed } = props;
		const values = (value?.toString() || defaultValue?.toString() || "")
			.toString()
			.split(".");

		let valueLast = values[1];
		if ((fixed || fixed === 0) && valueLast) {
			valueLast = values[1].substring(0, fixed);
		}
		this.state = {
			valueFirst: values[0]?.toString() || "",
			valueLast: valueLast?.toString() ? `.${valueLast}` : "",
			value: value?.toString() || defaultValue?.toString() || "",
		};
	}

	componentWillReceiveProps(nProps: IProps) {
		const { value, type, fixed } = nProps;
		const { valueFirst, valueLast, value: valueState } = this.state;
		if (type === "number") {
			if (
				value?.toString() !== `${valueFirst}${valueLast ? `.${valueLast}` : ""}`
			) {
				const values = value?.toString().split(".") || [];
				let valueLast = values[1];
				if ((fixed || fixed === 0) && valueLast) {
					valueLast = values[1].substring(0, fixed);
				}
				this.setState({
					valueFirst: values?.[0] || "",
					valueLast: valueLast ? `.${valueLast}` : "",
				});
			}
		} else if (value?.toString() !== valueState?.toString()) {
			this.setState({ value });
		}
	}

	handleChange = (e: any) => {
		const { onChange, type, min, max, fixed } = this.props;
		let value = e.target.value || "";
		if (value === ".") {
			value = "0.";
		}
		if (value === "-.") {
			value = "-0.";
		}
		if (type === "number") {
			value = value.replace(/[^0-9-.]/g, "").replace(/,/g, "");
			// tính toán số âm
			if (value.includes("-")) {
				if (value.replace(/[0-9.]/g, "").length % 2 === 0) {
					value = value.replace(/-/g, "");
				} else {
					value = `-${value.replace(/-/g, "")}`;
				}
			}
			if ((min || min === 1) && Number(value || 1) < min) {
				return;
			}
			if ((max || max === 0) && Number(value || 0) > max) {
				value = max.toString();
			}
			if (min && min >= 0) {
				value = value.replace(/-/g, "");
			}
			const values = value.split(".");
			const dot = value.includes(".") ? "." : "";
			if (type === "number") {
				if (
					(value.includes(".") && value.split(".")[1]) ||
					!value.includes(".")
				) {
					onChange?.(value);
				}
			} else {
				onChange?.(value);
			}
			let valueLast = values[1];
			if ((fixed || fixed === 0) && valueLast) {
				valueLast = values[1].substring(0, fixed);
			}
			this.setState({
				valueFirst: values[0],
				valueLast: dot + (valueLast || ""),
			});
		} else {
			onChange?.(e.target.value);
			this.setState({ value: e.target.value });
		}
	};

	onKeyDown = (e: any) => {
		const { type } = this.props;
		if (type !== "number") return;
		if (
			e.keyCode === 189 ||
			e.keyCode === 187 ||
			e.keyCode === 107 ||
			e.keyCode === 109 ||
			e.keyCode === 69
		) {
			e.preventDefault();
		}
	};

	render() {
		const {
			placeholder,
			type,
			disabled,
			style,
			className,
			endAdorn,
			error,
			decimal,
			...p
		} = this.props;
		const { valueFirst = "", valueLast = "", value = "" } = this.state;

		if (endAdorn) {
			return (
				<div className={error ? "has-err" : ""}>
					<Input
						style={style}
						className={className}
						disabled={!!disabled}
						onChange={this.handleChange}
						value={
							type === "number"
								? formatNumber(valueFirst) +
								  (decimal
										? valueLast.slice(0, decimal + 1).toString()
										: valueLast.toString())
								: value
						}
						placeholder={placeholder}
						onKeyDown={this.onKeyDown}
						autoComplete="off"
						endAdornment={
							<InputAdornment position="end">{endAdorn}</InputAdornment>
						}
						inputProps={{
							"aria-label": "endAdornment",
						}}
					/>
					<p
						style={{
							marginBottom: 0,
							color: "#ff4d4f",
							height: "auto",
							minHeight: "24px",
							opacity: 1,
							fontSize: "14px",
							lineHeight: "1.5715",
							transition: "color .3s cubic-bezier(.215,.61,.355,1)",
						}}
					>
						{error}
					</p>
				</div>
			);
		}
		return (
			<div className={error ? "has-err" : ""}>
				<TextField
					{...p}
					style={style}
					className={className}
					disabled={!!disabled}
					onChange={this.handleChange}
					value={
						type === "number"
							? formatNumber(valueFirst) +
							  (decimal
									? valueLast.slice(0, decimal + 1).toString()
									: valueLast.toString())
							: value
					}
					placeholder={placeholder}
					onKeyDown={this.onKeyDown}
					autoComplete="off"
				/>
				<p
					style={{
						marginBottom: 0,
						color: "#ff4d4f",
						height: "auto",
						minHeight: "24px",
						opacity: 1,
						fontSize: "14px",
						lineHeight: "1.5715",
						transition: "color .3s cubic-bezier(.215,.61,.355,1)",
					}}
				>
					{error}
				</p>
			</div>
		);
	}
}

export default FieldInput;
