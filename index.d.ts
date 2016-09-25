
import * as React from 'React';

enum ChartType {
	doughnut = 'doughnut',
	pie = 'pie',
	line = 'line',
	bar = 'bar',
	horizontalBar = 'horizontalBar',
	radar = 'radar',
	polarArea = 'polarArea'
}

interface ChartComponentProps {
	data :Object;
	height? :number;
	legend? :Object;
	onElementsClick? :Function;
	options? :Object;
	redraw? :boolean;
	type? :ChartType;
	width? :number;
}

export class Doughnut extends React.Component<ChartComponentProps, any>{}
export class Pie extends React.Component<ChartComponentProps, any>{}
export class Line extends React.Component<ChartComponentProps, any>{}
export class Bar extends React.Component<ChartComponentProps, any>{}
export class HorizontalBar extends React.Component<ChartComponentProps, any>{}
export class Radar extends React.Component<ChartComponentProps, any>{}
export class Polar extends React.Component<ChartComponentProps, any>{}
