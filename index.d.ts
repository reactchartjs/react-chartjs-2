
import * as React from 'react';

interface ChartComponentProps {
	data :Object;
	height? :number;
	legend? :Object;
	onElementsClick? :Function;
	options? :Object;
	redraw? :boolean;
	type? :String;
	width? :number;
}

export class Doughnut extends React.Component<ChartComponentProps, any>{}
export class Pie extends React.Component<ChartComponentProps, any>{}
export class Line extends React.Component<ChartComponentProps, any>{}
export class Bar extends React.Component<ChartComponentProps, any>{}
export class HorizontalBar extends React.Component<ChartComponentProps, any>{}
export class Radar extends React.Component<ChartComponentProps, any>{}
export class Polar extends React.Component<ChartComponentProps, any>{}
