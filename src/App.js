import { useState } from "react";
import "./App.css";

const initialItems = [
	{ id: 1, description: "Passports", quantity: 2, packed: true },
	{ id: 2, description: "Socks", quantity: 12, packed: false },
	{ id: 3, description: "Charger", quantity: 1, packed: false },
];

export default function App() {
	return (
		<div className="app">
			<Logo />
			<Form />
			<PackingList />
			<Stats />
		</div>
	);
}

function Logo() {
	return <h1>🏝 Far away🎒</h1>;
}
function Form() {
	//to create a controlled element
	//1: create a piece of state
	//2: define that piece of state on the element we want to control using value ={description}
	//3: connect the state with the input value / update that state variable using setDescription
	// create a piece of state for the controlled element
	// the value inside "" is the value given to description
	// setDescription is the function name that will edit description
	const [description, setDescription] = useState(""); // field for the item description
	// step 1 we create a piece of state, this is where we also set the default value
	const [quantity, setQuantity] = useState(1); // select the number of element in the "select" element
	function handleSubmit(e) {
		e.preventDefault();
		// if no description of item is given then we cant fill in the form
		//if no description then return immediatly meaning nothing will happen
		if (!description) return;

		//creation of a newItem object
		// Date.now is a built in fucntion that assign current date to create unique ids
		const newItem = { description, quantity, packed: false, id: Date.now() };

		// we are using controlled elements, we dont need to update the DOM, just the state
		// here we set the description and quantity back to its initial state
		setDescription("");
		setQuantity(1);
	}
	return (
		<div className="add-form" onSubmit={handleSubmit}>
			<h3>What do you need for your 😎 trip?</h3>
			<select
				value={quantity} // step 2 we set the value of quantity for creating a controlled element
				// step 3 we connect num to the value of quantity using an inline function
				// because value is always returned as a string by default we must convert it to an int using the Number function
				onChange={(e) => setQuantity(Number(e.target.value))}
			>
				{Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
					<option value={num} key={num}>
						{num}
					</option>
				))}
				{/*the equivalent of what is above
				<option value={1}>1</option>
				<option value={2}>2</option>
				<option value={3}>3</option>*/}
			</select>
			{/*we use the state "description" as a value of the input field
	. using the onChange handler prop allows us to listen to the change element 
	to connect the piece of state to the input value
		*/}
			<input
				type="text"
				placeholder="Item..."
				value={description}
				// using an inline function we receive the event e that was fired off
				// we are passing e.target.value to the piece of data
				// therefore react is now in charge of the data not the DOM creating a crontrolled element
				onChange={(e) => setDescription(e.target.value)}
			/>
			<button>Add</button>
		</div>
	);
}

function PackingList() {
	return (
		<div className="list">
			<ul>
				{initialItems.map((item) => (
					<Item item={item} key={item.id} />
				))}
			</ul>
		</div>
	);
}

function Item({ item }) {
	return (
		<li>
			<span style={item.packed ? { textDecoration: "line-through" } : {}}>
				{item.quantity}
				{item.description}
			</span>
			<button>❌</button>
		</li>
	);
}
function Stats() {
	return (
		<footer className="stats">
			<em>🎒You have X items on your list, and you already packed X (X%)</em>
		</footer>
	);
}
