import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Benchmark, BenchmarkValue, BenchmarkTable, sampleBenchmarkTable, sampleBenchmarks, sampleWorkflows } from '../../stores/BenchmarkTypes';
import { Workflow } from '../../stores/WorkflowTypes';
import * as d3 from 'd3';

const VisualizeBenchmark: React.FC<any> = observer((props) => {
  const benchmarkValues: BenchmarkTable = sampleBenchmarkTable;
  const workflows: Workflow[] = sampleWorkflows;
  const benchmarks: Benchmark[] = sampleBenchmarks;

  function mapValueToColor(value: number) {
    const colorScale = d3.scaleSequential()
      .domain([0, 1])
      .interpolator(d3.interpolateRdYlGn);
    const limitRange = d3.scaleLinear()
      .domain([0, 1])
      .range([0.2, 0.8]);
    const color = colorScale(limitRange(value));
    return color;
  }

  return (<div>
    <div className="m-20">
      <div className="overflow-x-auto text-left space-y-6 m-8 flex justify-center">
        <table className="table w-4/5">
          <thead>
            <tr>
              <th></th>
              { benchmarks.map(benchmark => (<th key={benchmark.id}>{benchmark.label}</th>)) }
            </tr>
          </thead>
          <tbody>
          { workflows.map(workflow => (
            <tr key={workflow.id}>
              <td>{ workflow.label }</td>
              { benchmarks.map(benchmark => {
                const bmValue: BenchmarkValue = benchmarkValues[workflow.id][benchmark.id];
                const color = mapValueToColor(bmValue.desirabilityValue);
                return (<td key={benchmark.id} style={{backgroundColor: color}}>{bmValue.value.toString()}</td>);
              })}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>);
});

export { VisualizeBenchmark };
