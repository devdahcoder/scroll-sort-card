import { useEffect, useRef, useState } from "react";
import "./App.css"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP, ScrollTrigger);

function App() {
	const [card, setCard] = useState<string[]>(["1", "2", "3"]);
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

	useGSAP(() => {
		cardRef.current.forEach((card, index) => {
			gsap.timeline({
				scrollTrigger: {
					trigger: ".card--container",
					start: `top+=${index * 200} top`,
					end: `top+=${(index + 1) * 100} top`,
					scrub: 5,
					markers: true,
				},
			})
				.fromTo(card, { x: 0 }, { x: 200, duration: 2 })
				.to(card, { x: 0, duration: 2 });
		});

		gsap.to(".card--container", {
			scrollTrigger: {
				trigger: ".card--container",
				start: "top top",
				end: `+=${cardRef.current.length * 300}`,
				pin: true,
				markers: true,
			},
		});
	});

	return (
		<div className="main--container">
			<div className="container card--container">
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
			<div className="container">helo word</div>
			<div className="container">helo word</div>
			<div className="container">helo word</div>
			<div className="container">helo word</div>
			<div className="container">helo word</div>
			<div className="container">helo word</div>
			<div className="container">helo word</div>
		</div>
	);
}

export default App
