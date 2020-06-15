const mongoose = require("mongoose");
const { Product, Category, LandingSection, Delivery } = require("./models");

const categories = [
	{title: 'Mushrooms', type: 'mushroom', color: 'var(--mushroom)', _id: '5ee77607640bc622b0e80e08'},
	{title: 'Berries', type: 'berry', color: 'var(--berry)', _id: '5ee77607640bc622b0e80e09'},
	{title: 'Flowers', type: 'flower', color: 'var(--flower)', _id: '5ee77607640bc622b0e80e0a'},
	{title: 'Reductions', type: 'reduction', color: 'var(--reduction)', _id: '5ee77607640bc622b0e80e0b'},
	{title: 'About Us', type: 'about', color: 'var(--primary)', _id: '5ee77607640bc622b0e80e0c'}
];

const deliveries = [
	{title: "Premium", price: 50, description: "Premium tracked delivery service", speed: 1},
	{title: "Standard", price: 15, description: "Standard untracked delivery service", speed: 5},
];


function addProduct(i){
	let n = Math.floor(Math.random()*4);
	let c = categories[n];
	Product.create({
		name: `${c.type} ${i}`,
		photos: [`https://picsum.photos/400?random=${n}`], 
		description: "description ipsum flooby blup blup, isn't it? yeah.",
		// reviews: [{title: "Review Title One",score: 2, author: "nick", content: "review content"},{title: "A More Generous Review",score: 5, author: "dave", content: "extended review content lorem description ipsum flooby blup blup, isn't it? yeah. description ipsum flooby blup blup, isn't it? yeah."}],
		price: Math.floor(Math.random()*99),
		type: c._id,
		stock: Math.floor(Math.random()*20)
	});
}


function addToLanding(dark,header,copy,image,type,links){
	LandingSection.create({
		dark,
		header,
		copy,
		image,
		type,
		links
	});
};

function addDelivery({title, price, description, speed}){
	Delivery.create({
		title,
		price,
		description,
		speed
	});
};

function seedDB(){
	Product.deleteMany({},err=>{
		if(err){
			console.log(err)
		} else {
			for(let i=0;i<40;i++){
				addProduct(i);
			};
		}
	});

	LandingSection.deleteMany({},err=>{
		if(err){
			console.log(err)
		} else {
			addToLanding(
				false,
				'Big Mushroom Offer',
				'Buy seven mushrooms get one free! Limited stock available.',
				'https://images.unsplash.com/photo-1528518290605-1fcc8dcca204?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9',
				'mushroom',
				[{title: 'Shop Now', link: '/products/mushrooms'},{title: 'Shop Later', link: '/products/mushrooms'}]
			);
			addToLanding(
				true,
				'Berry Special',
				"See what we did there? It's a pun. You like puns, don't you? Yeah you do.",
				'https://images.unsplash.com/photo-1445197138520-6099f1c07aa0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9',
				'berry',
				[{title: 'Shop Now', link: '/products/berries'},{title: 'Shop Later', link: '/products/berries'}]
			);
			addToLanding(
				false,
				'Lovely Lovely Flowers',
				"Lovely flowers. Just don't eat them. Really, don't eat them.",
				'https://images.unsplash.com/photo-1567748157439-651aca2ff064?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9',
				'flower',
				[{title: 'Shop Now', link: '/products/flowers'},{title: 'Shop Later', link: '/products/flowers'}]
			);
		}
	});

	Category.deleteMany({},err=>{
		if(err){
			console.log(err)
		} else {
			categories.forEach((seed)=>{
				Category.create({
					title: seed.title,
					type: seed.type,
					color: seed.color
				});
			});
		}});

	Delivery.deleteMany({},err=>{
		if(err){
			console.log(err)
		} else {
			deliveries.forEach(seed=>{
				addDelivery(seed)
			})
		}});
}

module.exports = seedDB;