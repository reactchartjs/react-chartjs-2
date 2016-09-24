import ChartComponent from "../Chart";

describe('Chart re-rendering', () => {

    it('required when chart data changes', () => {
        const chart = new ChartComponent({type: 'bar', data: {}});
        const updateRequired = chart.shouldComponentUpdate({type: 'bar', data: {labels: ['a', 'b']}});
        expect(updateRequired).toBeTruthy();
    });

    it('required when chart legend changes', () => {
        const chart = new ChartComponent({type: 'bar', legend: {display: false}});
        const updateRequired = chart.shouldComponentUpdate({type: 'bar', legend: {display: true}});
        expect(updateRequired).toBeTruthy();
    });

    it('required when data is changed in an inner object/array of the data', () => {
        const originalData = {
            "data": {
                "labels": [
                    1
                ],
                "datasets": [
                    {
                        "label": "a",
                        "backgroundColor": "#36A2EB",
                        "data": [
                          122968
                        ]
                    },
                    {
                        "label": "b",
                        "backgroundColor": "#FF6384",
                        "data": [
                          14738
                        ]
                    }
                ]
            },
            "type": "bar",
            "legend": {
                "display": true,
                "position": "bottom"
            }
        }
        // The new data has only one data set instead of two
        const newData = {
            "data": {
                "labels": [
                    1
                ],
                "datasets": [
                    {
                        "label": "a",
                        "backgroundColor": "#36A2EB",
                        "data": [
                          122968
                        ]
                    }
                ]
            },
            "type": "bar",
            "legend": {
                "display": true,
                "position": "bottom"
            }
        }
        const chart = new ChartComponent(originalData);
        const updateRequired = chart.shouldComponentUpdate(newData);
        expect(updateRequired).toBeTruthy();
    });

    it('required when chart options change', () => {
        const chart = new ChartComponent({type: 'bar', options: {hover: {mode: 'single'}}});
        const updateRequired = chart.shouldComponentUpdate({type: 'bar', options: {hover: {mode: 'label'}}});
        expect(updateRequired).toBeTruthy();
    });

    it('not required when width changes', () => {
        const chart = new ChartComponent({type: 'bar', width: 100});
        const updateRequired = chart.shouldComponentUpdate({type: 'bar', width: 200});
        expect(updateRequired).toBeFalsy();
    });

    it('not required when height changes', () => {
        const chart = new ChartComponent({type: 'bar', height: 100});
        const updateRequired = chart.shouldComponentUpdate({type: 'bar', height: 200});
        expect(updateRequired).toBeFalsy();
    });

    it('not required when data do not change and onElementsClick installed', () => {
        const chart = new ChartComponent({
            type: 'bar', data: {}, onElementsClick: () => {
            }
        });
        const updateRequired = chart.shouldComponentUpdate({
            type: 'bar', data: {}, onElementsClick: () => {
            }
        });
        expect(updateRequired).toBeFalsy();
    });
});
