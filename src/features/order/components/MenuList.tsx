import CardDishes from './CardDishes';

export type Dish = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
};
export default function MenuList() {
    const dishes = [
        {
            id: 1,
            name: 'Pasta Bolognese',
            description: 'Pasta with rich tomato and meat sauce',
            price: 12.99,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 2,
            name: 'Grilled Chicken',
            description: 'Juicy grilled chicken with spices',
            price: 10.5,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 3,
            name: 'Grilled Chicken',
            description: 'Juicy grilled chicken with spices',
            price: 10.5,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 4,
            name: 'Grilled Chicken',
            description: 'Juicy grilled chicken with spices',
            price: 10.5,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 5,
            name: 'Grilled Chicken',
            description: 'Juicy grilled chicken with spices',
            price: 10.5,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 6,
            name: 'Grilled Chicken',
            description: 'Juicy grilled chicken with spices',
            price: 10.5,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 7,
            name: 'Grilled Chicken',
            description: 'Juicy grilled chicken with spices',
            price: 10.5,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 8,
            name: 'Grilled Chicken',
            description: 'Juicy grilled chicken with spices',
            price: 10.5,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 9,
            name: 'Grilled Chicken',
            description: 'Juicy grilled chicken with spices',
            price: 10.5,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 10,
            name: 'Grilled Chicken',
            description: 'Juicy grilled chicken with spices',
            price: 10.5,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 11,
            name: 'Grilled Chicken',
            description: 'Juicy grilled chicken with spices',
            price: 10.5,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 12,
            name: 'Grilled Chicken',
            description: 'Juicy grilled chicken with spices',
            price: 10.5,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 13,
            name: 'Grilled Chicken',
            description: 'Juicy grilled chicken with spices',
            price: 10.5,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 14,
            name: 'Grilled Chicken',
            description: 'Juicy grilled chicken with spices',
            price: 10.5,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 15,
            name: 'Grilled Chicken',
            description: 'Juicy grilled chicken with spices',
            price: 10.5,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 16,
            name: 'Grilled Chicken',
            description: 'Juicy grilled chicken with spices',
            price: 10.5,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 17,
            name: 'Grilled Chicken',
            description: 'Juicy grilled chicken with spices',
            price: 10.5,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 18,
            name: 'Grilled Chicken',
            description: 'Juicy grilled chicken with spices',
            price: 10.5,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 19,
            name: 'Grilled Chicken asdasdasdasdasdasdasd',
            description: 'Juicy grilled chicken with spices asdasdasd asdasdasd asfqwefasasd',
            price: 10.5,
            image: 'https://via.placeholder.com/150',
        },
    ];
    return (
        <section>
            <h1 className='font-medium font-outfit'>Elije tu plato</h1>
            <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-8'>
                {dishes.map((dish) => (
                    <li key={dish.id}>
                        <CardDishes dish={dish} />
                    </li>
                ))}
            </ul>
        </section>
    );
}
