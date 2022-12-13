import "https://deno.land/std@0.167.0/dotenv/load.ts";
import Webflow from "npm:webflow-api";

const webflow = new Webflow({ token: Deno.env.get("WEBFLOW_API") });

// these lines are used to get the collection ids
const site = await webflow.site({ siteId: Deno.env.get("SITE_ID") });
const collections = await site.collections();

// get relevant collection ids
// TODO: abstract repeated sections
const syntheticsFaqCollectionId = collections.find(
  (collection) => collection.slug == "gretel-synthetics-faqs"
)._id;
const cloudFaqCollectionId = collections.find(
  (collection) => collection.slug == "gretel-cloud-faqs"
)._id;
const blogCollectionId = collections.find(
  (collection) => collection.slug == "blog"
)._id;

// get collections
const blogCollection = await webflow.collection({
  collectionId: blogCollectionId,
});
const syntheticsFaqCollection = await webflow.collection({
  collectionId: syntheticsFaqCollectionId,
});
const cloudFaqCollection = await webflow.collection({
  collectionId: cloudFaqCollectionId,
});

// get items for each collection
const blogItems = await blogCollection.items();
const syntheticsFaqItems = await syntheticsFaqCollection.items();
const cloudFaqItems = await cloudFaqCollection.items();

async function writeJson(filePath, o) {
  try {
    await Deno.writeTextFile(filePath, JSON.stringify(o));
  } catch (e) {
    console.log(e);
  }
}

// write each collection to disk
await writeJson("./blogposts.json", blogItems);
await writeJson("./syntheticsFaqs.json", syntheticsFaqItems);
await writeJson("./cloudFaqs.json", cloudFaqItems);
