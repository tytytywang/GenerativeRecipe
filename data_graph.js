// Load the JSON file
d3.json('data.json').then(data => {
    console.log(data); // Check if the data is loaded correctly
  
    // Append an SVG element to the body
    const svg = d3.select('body').append('svg')
      .attr('width', 500)
      .attr('height', 300);
    
    console.log(svg); // Verify if SVG is created
    
    // Create a hierarchical layout from the data
    const root = d3.hierarchy(data);
    console.log(root); // Check the root hierarchy
    
    const treeLayout = d3.tree().size([400, 200]);
    treeLayout(root);
  
    // Draw links between nodes
    const links = root.descendants().slice(1);
    console.log(links); // Check the links data
  
    svg.selectAll('.link')
      .data(links)
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', d => `M${d.x},${d.y}C${d.x},${(d.y + d.parent.y) / 2} ${d.parent.x},${(d.y + d.parent.y) / 2} ${d.parent.x},${d.parent.y}`);
  
    // Draw nodes
    const nodes = svg.selectAll('.node')
      .data(root.descendants())
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`);
  
    console.log(nodes); // Check the nodes data
  
    // Append circles to represent nodes
    nodes.append('circle')
      .attr('r', 5);
  
    // Append text to the nodes
    nodes.append('text')
      .attr('dy', '0.31em')
      .attr('x', d => d.children ? -8 : 8)
      .style('text-anchor', d => d.children ? 'end' : 'start')
      .text(d => d.data.name);
  }).catch(error => {
    console.error('Error loading JSON:', error); // Check for any errors during data loading
  });
  