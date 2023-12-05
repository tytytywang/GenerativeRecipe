// Sample JSON data
const jsonData = {
    "categories": [
        {
            "Ingredient": ["Ground Beef", "Italian Sausage", "Chicken", "Shrimp", "Salmon", "Pancetta", "Tomatoes",
                "Garlic", "Onion", "Bell Peppers", "Mushrooms", "Spinach", "Zucchini", "Cherry Tomatoes",
                "Parmesan", "Mozzarella", "Ricotta", "Pecorino", "Gorgonzola"],
            "Cuisine": ["Italian", "American", "Asian", "Mediterranean", "Latin American"],
            "PreparationTime": ["10mins", "20mins"],
            "CookingMethod": ["Frying", "Stewing", "Boiling", "Baking"],
            "AllergenInformation": ["Wheat", "Gluten", "Eggs", "Milk", "Soy", "Tree Nuts", "Peanuts", "Shellfish", "Fish"],
            "DietaryConsideration": ["Whole Grain", "Vegetarian", "High-Protein", "Vegan", "Gluten-Free"],
            "Varieties": ["Spaghetti", "Penne", "Fusilli", "Farfalle", "Rigatoni", "Fettuccine", "Linguine", "Orzo",
                "Ravioli", "Tortellini"]
        }
    ]
};

const categories = jsonData.categories[0];
const centralNode = { id: "Pasta", type: 'central' };
const nodes = Object.keys(categories).flatMap(category => {
    const categoryNode = { id: category, type: 'category' };
    const items = categories[category].map(item => ({ id: item, type: 'item' }));
    return [centralNode, categoryNode, ...items];
});

const links = Object.keys(categories).map(category => ({
    source: centralNode.id,
    target: category,
    distance: (category === 'Ingredient') ? 200 : 100
}));

const itemLinks = Object.keys(categories).flatMap(category => {
    const items = categories[category].map(item => ({
        source: category,
        target: item,
        distance: (category === 'Ingredient') ? 200 : 100
    }));
    return items;
});

const allLinks = [...links, ...itemLinks];

const svg = d3.select("#graph"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

const simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(d => d.id).distance(d => d.distance))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

const link = svg.append("g")
    .selectAll("line")
    .data(allLinks)
    .enter().append("line")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .attr("stroke-width", 2);

const node = svg.append("g")
    .selectAll("g")
    .data(nodes)
    .enter().append("g")
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
    .on("click", clicked);

node.append("circle")
    .attr("r", d => (d.type === 'central') ? 30 : 20)
    .attr("fill", d => (d.type === 'central') ? "red" : (d.type === 'category') ? "steelblue" : "orange");

node.append("text")
    .attr("x", d => (d.type === 'central') ? 0 : 0)
    .attr("dy", d => (d.type === 'central') ? "0.35em" : "0.35em")
    .style("text-anchor", "middle")
    .style("fill", "white")
    .style("font-size", d => (d.type === 'central') ? "16px" : "10px")
    .text(d => d.id);

node.append("title")
    .text(d => d.id);

let clickedNodes = [];

simulation
    .nodes(nodes)
    .on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("transform", d => `translate(${d.x},${d.y})`);
    });

simulation.force("link")
    .links(allLinks);

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

function clicked(event, d) {
    const index = clickedNodes.findIndex(node => node.id === d.id);

    if (index === -1) {
        clickedNodes.push({ id: d.id, color: d3.select(this).select("circle").attr("fill") });
        d3.select(this).select("circle").attr("fill", "green");
    } else {
        d3.select(this).select("circle").attr("fill", clickedNodes[index].color);
        clickedNodes.splice(index, 1);
    }

    console.log("Clicked Nodes:", clickedNodes);
}


// Append a submit button below the graph
const submitButton = d3.select("body")
  .append("button")
  .text("Submit")
  .style("margin-top", "20px")
  .style("margin-right", "440px") // Adjusting the right margin to move the button to the left
  .on("click", handleSubmit); // Call handleSubmit function on button click

function handleSubmit() {
  // Add your logic here for handling the submit action
  // For example, you can retrieve values from the text box or perform an action
  console.log("Submit button clicked!");
}

