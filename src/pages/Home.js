import Banner from '../components/Banner.js';

export default function Home() {
    const data = {
        title: "Welcome to Zuitt Workout",
        content: "Your Workout tracker!",
        destination: "/login",
        buttonLabel: "Browse Product!"
    };

 

    return (
        <>
            <Banner data={data}/>
        </>
    );
}