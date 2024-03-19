//domain.com/new-meetup/[meetupId]
import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail'

function MeetupDetails(props) {
    console.log('description === ',props.meetupData.description)
    return <Fragment>
        <Head>
            <title>{props.meetupData.title}</title>
            <meta
                name='description'
                content={props.meetupData.description} />
        </Head>
        <MeetupDetail
            title={props.meetupData.title}
            image={props.meetupData.image}
            address={props.meetupData.address}
            description={props.meetupData.description} />
    </Fragment>
}

export async function getStaticPaths() {
    //fetch data from db
    const client = new MongoClient('mongodb+srv://sadvenus:chgbWxmucUlkwCxt@cluster0.ml4ovdd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    await client.connect();

    const dbName = "myFirstDatabase";
    const collectionName = "meetups";

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    //find parameters mean: find all the documents in the db, only pull the _id: key/value pairs
    const meetups = await collection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: 'block',
        paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } }))
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    //fetch data for single meetup
    //fetch data from db
    const client = new MongoClient('mongodb+srv://sadvenus:chgbWxmucUlkwCxt@cluster0.ml4ovdd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    await client.connect();

    const dbName = "myFirstDatabase";
    const collectionName = "meetups";

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    //find parameters mean: find all the documents in the db, only pull the _id: key/value pairs
    const selectedMeetup = await collection.findOne({
        _id: new ObjectId(meetupId)
    });

    client.close();


    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            }
        }
    }
}

export default MeetupDetails;