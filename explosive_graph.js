// Sample data representing interconnected nodes
const nodes = [
    { id: 'Node 1' },
    { id: 'Node 2' },
    { id: 'Node 3' },
    { id: 'Node 4' }
  ];
  
  // Sample links between nodes
  const links = [
    { source: 'Node 1', target: 'Node 2' },
    { source: 'Node 2', target: 'Node 3' },
    { source: 'Node 3', target: 'Node 4' }
  ];
  
  // Create a D3 force simulation
  const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id))
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(300, 200));
  
  // Create SVG elements for links and nodes
  const svg = d3.select('svg');
  
  const link = svg.selectAll('.link')
    .data(links)
    .enter().append('line')
    .attr('class', 'link');
  
  const node = svg.selectAll('.node')
    .data(nodes)
    .enter().append('circle')
    .attr('class', 'node')
    .attr('r', 10);
  
  // Add drag functionality to nodes
  node.call(d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended));
  
  // Update positions of nodes and links in the simulation
  simulation.on('tick', () => {
    link.attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
  
    node.attr('cx', d => d.x)
      .attr('cy', d => d.y);
  });
  
  // Functions for node drag behavior
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  
  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  