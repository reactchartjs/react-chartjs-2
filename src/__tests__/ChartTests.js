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
