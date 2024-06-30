import { useEffect, useRef, useState } from "react";
import "./App.css"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function App() {
	const [card, setCard] = useState<string[]>(["1", "2", "3", "4", "5"]);
  const cardRef = useRef<HTMLDivElement[]>([]);

	useEffect(() => {
		cardRef.current = cardRef.current.slice(0, card.length);
	}, [card]);

	const handlePlus = () => {
		if (cardRef.current.length > 0) {
			const currentCard = cardRef.current?.pop();
			if (currentCard !== undefined) {
				gsap.to(currentCard, {
					rotate: 10,
					x: 200,
					duration: 0.5,
					ease: "power3.out",
					onComplete: () => {
						for (let i = 0; i < card.length; i++) {
							gsap.to(cardRef.current[i], {
								zIndex: `${i + 1}`,
								y: (i + 1) * 20,
								duration: 0.5,
								ease: "power3.out",
							});
						}
						gsap.to(currentCard, {
							rotate: 0,
							x: 0,
							zIndex: 0,
							y: 0,
							duration: 0.5,
							ease: "power3.out",
							onComplete: () => {
								cardRef.current.unshift(currentCard);
							},
						});
					},
				});
			}
		}
	};


	
	
	return (
		<div>
			<div className="container">
				{card?.map((ele, index) => (
					<div
						ref={(element: HTMLDivElement) =>
							(cardRef.current[index] = element)
						}
						className={`card`}
						key={index}
						tabIndex={index}
						style={{
							zIndex: index,
							border: `1px solid #${89 + index}`,
							transform: `translateY(${index * 20}px)`,
						}}
					>
						{ele}hello world
					</div>
				))}
			</div>
			<button onClick={handlePlus}>+</button>
		</div>
	);
}

export default App
