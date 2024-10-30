
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import EmployeeCard from "./components/EmployeeCard";

interface Employee {
	name: {
		first: string;
		last: string;
	};
	email: string;
	picture: {
		medium: string;
	};
}

export default function App() {
	const [employee, setEmployee] = useState<Employee | null>(null);

	const getEmployee = () => {
		fetch("https://randomuser.me/api?nat=en")
			.then((response) => response.json())
			.then((data) => {
				setEmployee(data.results[0]); // Met à jour le profil avec le premier résultat
			});
	};

	// Charger un profil initialement au montage
	useEffect(() => {
		getEmployee();
	}, []);

	return (
		<div className="App">
			<h1>Profil d'une personne aléatoire</h1>
			{employee ? (
				<EmployeeCard employee={employee} />
			) : (
				<p>Chargement du profil...</p>
			)}
			<button type="button" onClick={getEmployee}>
				Obtenir un nouveau profil
			</button>
		</div>
	);
}
