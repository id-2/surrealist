import { Box, Indicator, type IndicatorProps, Text, Tooltip } from "@mantine/core";
import clsx from "clsx";
import { isObject } from "radash";
import type { HTMLProps, ReactNode } from "react";
import { useRouteMatcher } from "~/hooks/routing";
import { useStable } from "~/hooks/stable";
import { useInterfaceStore } from "~/stores/interface";
import { Entry, type EntryProps } from "../Entry";
import { Icon } from "../Icon";
import classes from "./style.module.scss";

export interface NavigationIconProps
	extends EntryProps,
		Omit<HTMLProps<HTMLButtonElement>, "name" | "color" | "size" | "style" | "type" | "ref"> {
	name: ReactNode;
	match?: string[];
	indicator?: boolean | IndicatorProps;
	icon: string | any;
	withTooltip?: boolean;
	onClick: () => void;
}

export function NavigationIcon({
	name,
	match,
	icon,
	withTooltip,
	onClick,
	indicator,
	...rest
}: NavigationIconProps) {
	const { setOverlaySidebar } = useInterfaceStore.getState();
	const active = useRouteMatcher(match || []);
	const isActive = match && active && match?.length > 0;

	// const { isLoading, ref, onMouseEnter, onMouseLeave } = useHoverIcon({
	// 	animation: hasIcon ? { w: 0, h: 0, layers: [] } : icon,
	// 	className: classes.animation,
	// });

	const handleClick = useStable(() => {
		setOverlaySidebar(false);
		onClick();
	});

	return (
		<Tooltip
			label={name}
			position="right"
			disabled={!withTooltip}
			offset={14}
			openDelay={300}
		>
			<Box
				w="100%"
				// onMouseEnter={onMouseEnter}
				// onMouseLeave={onMouseLeave}
			>
				<Entry
					className={clsx(classes.viewButton, isActive && classes.viewButtonActive)}
					isActive={isActive}
					// style={{ opacity: isLoading ? 0 : 1 }}
					onClick={handleClick}
					leftSection={
						<Indicator
							disabled={!indicator}
							{...(isObject(indicator) ? indicator : {})}
						>
							<Icon
								path={icon}
								size="lg"
							/>
						</Indicator>
					}
					{...rest}
				>
					<Text
						truncate
						inherit
						span
						lh="normal"
					>
						{name}
					</Text>
				</Entry>
			</Box>
		</Tooltip>
	);
}
