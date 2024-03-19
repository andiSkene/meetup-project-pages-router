import Head from 'next/head';
import { Fragment } from 'react';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
    return <Fragment>
        <Head>
            <title>React Meetups</title>
            <meta 
            name='description' 
            content='Browse a huge list of highly active React meetups!' />
        </Head>
        <MeetupList meetups={props.meetups} />
    </Fragment>
}

/* export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;

    //fetch data from db
    return {
        props: {
            meetups: DUMMY_MEETUPS
        }
    }
}
 */
export async function getStaticProps() {
    //fetch data from db
    const client = new MongoClient('mongodb+srv://<name>:<password>@cluster0.ml4ovdd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    await client.connect();

    const dbName = "myFirstDatabase";
    const collectionName = "meetups";

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const meetups = await collection.find().toArray();

    client.close();

    //return an object that will be passed as this component's parameter -- props object
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                adddress: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 3600
    }
}

export default HomePage;
