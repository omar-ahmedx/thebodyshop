// Get aruguments passed on command line
const userArgs = process.argv.slice(2);
const async = require("async");
const Categories = require("./models/categories");
const Products = require("./models/product");

const mongoose = require("mongoose");
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParsel: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, " MongoDB connection error"));

const categories = [];
const products = [];

function categoriesCreate(name, description, cb) {
  categoryDetailes = { name, description };

  const category = new Categories(categoryDetailes);

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Category: ", category);
    categories.push(category);
    cb(null, category);
  });
}

function productsCreate(
  img,
  name,
  description,
  category,
  old_price,
  price,
  num_in_stock,
  how_to_use,
  features,
  ingredients,
  bestselling,
  online,
  cb
) {
  productDetails = {
    img,
    name,
    description,
    category,
    old_price,
    price,
    num_in_stock,
    how_to_use,
    features,
    ingredients,
    bestselling,
    online,
  };
  const product = new Products(productDetails);
  product.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Product: " + product);
    products.push(product);
    cb(null, product);
  });
}

function createCategories(cb) {
  async.parallel(
    [
      function (callback) {
        categoriesCreate(
          "Face",
          "Your incredible uniquely-you face. Home to over twenty amazing expressions. Happy, sad, defiant or carefree – we think your visage is pretty darn incredible. Heroically exposed to the great outdoors and the great indoors, all the more reason to lavish it with TLC. View all of our face products, whether you’re after something polishing, plumping or pampering. And what’s more, our face products won’t go near our shelves unless they meet our high tree-hugging standards.",
          callback
        );
      },
      function (callback) {
        categoriesCreate(
          "Body",
          "Let’s talk bath and body care – the two go hand-in-hand. And our range is packed with lovely body products. The good stuff your skin needs to look and feel healthier. Body Butters? Yes. Shower Gels? Yes. Coconut Soap? Yes, yes, yes. We also have a body buffing Bath Lily, because we’re mindful that bathing and scrubbing troubles away can make a world of difference to your day. View all body products and goodies here. Bring on the bubbles.",
          callback
        );
      },
    ],
    cb
  );
}

function createProducts(cb) {
  async.parallel(
    [
      function (callback) {
        productsCreate(
          [
            "/images/products/product.webp",
            "/images/products/product2.webp",
            "/images/products/product3.webp",
            "/images/products/product4.webp",
            "/images/products/product5.webp",
          ],
          "Drops of Youth™ Bouncy Sleeping Mask",
          "This refreshing overnight facemask has been formulated to address the first signs of ageing. Enriched with edelweiss stem cells, the innovatively bouncy, gel-cream texture moulds itself like a second skin for instant hydration. Wake up to soft, youthful looking skin that feels plumper, replenished and renewed. ",
          categories[0].name,
          650,
          240,
          10,
          "Apply every night on cleansed skin as a last step of skincare. Apply on face and neck by gently massaging into skin. Leave on to absorb. Avoid eye area.",
          [
            "With three plant stem cells: edelweiss from the Italian Alps, sea holly and criste marine from the Brittany Coast",
            "Enriched with Community Trade moringa seed oil from Rwanda",
            "Instantly feels like dead skin cells are lifted (88% agree*) ",
            "Peels off impurities and pollutants (88% agree*) Skin feels cleansed from day’s pollution (85% agree*)",
            " Dermatologically tested ",
            "*when tested on 109 women ",
          ],
          "Aqua/Water/Eau, Alcohol Denat., Propylene Glycol, Glycerin, Carbomer, PPG-26-Buteth-26, Palmitamidopropyltrimonium Chloride, PEG-40 Hydrogenated Castor Oil, Quaternium-80, Parfum/Fragrance, Behentrimonium Chloride, Linalool, Citronellol, Cetrimonium Chloride, Isopropyl Alcohol, Crithmum Maritimum Extract, Eryngium Maritimum Extract, Leontopodium Alpinum Callus Culture Extract, Sodium Hyaluronate, CitricAcid, Xanthan Gum. ",
          true,
          true,
          callback
        );
      },
      function (callback) {
        productsCreate(
          [
            "/images/products/product-2-1.jpg",
            "/images/products/product-2-2.jpg",
            "/images/products/product-2-3.jpg",
          ],
          "Vitamin E Quench Sheet Mask",
          "Hydrate thirsty skin in just 15 minutes with our Vitamin E Quench Sheet Mask. Enriched with organic aloe vera, natural-origin hyaluronic acid and wheatgerm oil, this mask locks in 24hr hydration and leaves skin feeling instantly softer, smoother and re-plumped with moisture.  ",
          categories[0].name,
          125,
          55,
          0,
          null,
          [
            "Hydrating single-use sheet mask",
            "Suitable for all skin types",
            "Skin feels hydrated, softer and smoother",
            "24hr hydration",
            "Easy to use for instant results",
            " Enriched with natural-origin hyaluronic acid from France, wheatgerm oil and organic aloe vera from Mexico",
            "Biodegradable sheet (not including packaging) ",
          ],
          null,
          true,
          false,
          callback
        );
      },
      function (callback) {
        productsCreate(
          [
            "/images/products/product-3.jpg",
            "/images/products/product-3-1.jpg",
            "/images/products/product-3-2.jpg",
            "/images/products/product-3-3.jpg",
            "/images/products/product-3-4.jpg",
          ],
          "Mandarin Energising Face Mist",
          "Wake-up with Mandarin Energising Face Mist. Kick-start the day with a spritz of this zingy mist to help re-energise your complexion - perfect when late nights are starting to take their toll on your skin. Infused with mandarin, camu camu berry extract from Brazil, maca root extract from Peru, and caffeine for an extra boost. Leaves skin feeling hydrated and instantly refreshed.",
          categories[0].name,
          650,
          240,
          0,
          null,
          [
            "100% vegan",
            "Enriched with organic aloe vera from Mexico",
            "Skin feels energised and dullness appears reduced",
            "Suitable for all skin types",
            "For tired, grumpy skin",
            "Dermatologically tested",
            "Make-up friendly ",
          ],
          "Aqua/Water/Eau, Propanediol, Glycerin, Polysorbate 20, Phenoxyethanol, Caprylyl Glycol, Citrus Nobilis Fruit Extract/Mandarin Orange Fruit Extract, Caffeine, Parfum/Fragrance, Limonene, Trisodium Ethylenediamine Disuccinate, Aloe Barbadensis Leaf Juice Powder, Hydrolyzed Lepidium Meyenii Root, Citric Acid, 1,2-Hexanediol, Citral, Myrciaria Dubia Fruit Extract, Lycium Barbarum Fruit Extract, Capryloyl Glycine, Sodium Hydroxide, Linalool, Sodium Benzoate, Sodium Dehydroacetate, Salicylic Acid, Lactic Acid, Potassium Sorbate.",
          false,
          true,
          callback
        );
      },
      function (callback) {
        productsCreate(
          [
            "/images/products/product-4.webp",
            "/images/products/product-4-1.jpg",
            "/images/products/product-4-2.jpg",
            "/images/products/product-4-3.jpg",
          ],
          "Coconut Bronze Matte Bronzing Powder",
          "For natural-looking summer skin all year round, dust on our Coconut Bronze Matte Bronzing Powder. Available in three shades, our lightweight bronzing powder has an easy-to-use puff so you can touch up your radiant, sun-kissed effect whenever and wherever you want. ",
          categories[0].name,
          450,
          340,
          15,
          "Apply to face with a brush or puff for natural-looking, sun-kissed skin. Build your sun-kissed look with our Coconut Bronze range. ",
          [
            "Matte bronzing powder",
            "Available in three shades",
            "Non-cakey formula",
            "Blends seamlessly into skin",
            "Enriched with Community Fair Trade organic virgin coconut oil from Samoa",
            " Suitable for sensitive skin",
            "Dermatologically tested ",
            "100% recyclable packaging",
          ],
          null,
          false,
          false,
          callback
        );
      },
      function (callback) {
        productsCreate(
          ["/images/products/product-5.webp"],
          "Tea Tree Anti-Imperfection Daily Solution",
          "This lightweight daily solution helps combat blemishes and improves the overall condition of skin. Enriched with Community Trade tea tree oil, it helps skin look and feel purified, clearer and mattified, with imperfections* appearing reduced. *Tone, texture and oiliness",
          categories[0].name,
          500,
          375,
          20,
          "Apply 2-3 drops onto fingertips and massage all over face. Apply morning and evening after cleansing and before your daily moisturiser. Target areas of concern with our best-selling Tea Tree Oil.",
          [
            "Enriched with Community Fair Trade tea tree oil from Kenya.",
            "Helps combat blemishes and improve the overall condition of skin ",
          ],
          "Aqua/Water/Eau, Alcohol Denat., Propanediol, PPG-26-Buteth-26, Phenoxyethanol, PEG-40 Hydrogenated Castor Oil, Melaleuca Alternifolia Leaf Oil/Melaleuca Alternifolia (Tea Tree) Leaf Oil, Caprylyl Glycol, Ammonium Acryloyldimethyltaurate/VP Copolymer, Salicylic Acid, Xanthan Gum, Calophyllum Inophyllum Seed Oil, Disodium EDTA, Medicago Sativa Extract/Medicago Sativa (Alfalfa) Extract, Potassium Hydroxide, Aloe Barbadensis Leaf Juice Powder, Limonene, Sodium Hyaluronate, Citral, t-Butyl Alcohol, Sodium Benzoate, Citronellol, Leptospermum Petersonii Oil, Tocopherol.",
          true,
          true,
          callback
        );
      },

      function (callback) {
        productsCreate(
          [
            "/images/products/product-6.jpg",
            "/images/products/product-6-1.jpg",
            "/images/products/product-6-2.jpg",
            "/images/products/product-6-3.jpg",
          ],
          "Almond Milk Body Yogurt",
          "Life’s too short for waiting - jump straight into your jeans with our Almond Body Yogurt. The new, lightweight formula absorbs instantly and provides up to 48 hours of moisture. Apply to damp skin straight after showering for skin that feels smoother and never sticky, with the sweet and nutty scent of almonds. The gel-cream is 100% vegetarian, enriched with organic almond milk from Spain.",
          categories[1].name,
          420,
          315,
          2,
          null,
          [
            "Lightweight, fast-absorbing gel-cream formula",
            "100% vegetarian",
            "48hr moisture",
            "Enriched with organic almond milk from Spain",
            "87% agree the formula absorbs instantly*",
            "86% like that the formula works on damp skin*",
            "3 in 4 agree they can put their jeans on straight after application*",
            "95% agree skin feels moisturised*",
            "81% agree skin appears radiant* *User trial on 104 women & men.",
          ],
          "Aqua, Glycerin, Alcohol Denat., Dimethicone, Butylene Glycol, Parfum, Phenoxyethanol, Carbomer, PEG-100 Stearate, Glyceryl Stearate, Butyrospermum Parkii Butter, Dimethiconol, Caprylyl Glycol, Sodium Hydroxide, Sodium Hyaluronate, Prunus Amygdalus Dulcis Seed Extract, Xanthan Gum, Citric Acid, Dehydroacetic Acid.",
          true,
          false,
          callback
        );
      },
      function (callback) {
        productsCreate(
          [
            "/images/products/product-7.jpg",
            "/images/products/product-7-1.jpg",
            "/images/products/product-7-2.jpg",
            "/images/products/product-7-3.jpg",
            "/images/products/product-7-4.jpg",
          ],
          "Mango Body Yogurt",
          "Life’s too short for waiting - jump straight into your jeans with our Mango Body Yogurt. The new, lightweight formula absorbs instantly and provides up to 48 hours of moisture. Apply to damp skin straight after showering for skin that feels smoother and never sticky, with the fruity, tropical scent of mangoes. The gel-cream is 100% vegan, enriched with mango juice and organic almond milk from Spain.",
          categories[1].name,
          500,
          375,
          0,
          null,
          [
            "NEW lightweight, fast-absorbing gel-cream formula",
            "100% vegan",
            "48hr moisture",
            "Enriched with mango juice and organic almond milk from Spain",
            "87% agree the formula absorbs instantly*",
            "86% like that the formula works on damp skin*",
            "95% agree skin feels moisturised*",
            "81% agree skin appears radiant* *User trial on 104 women & men.",
          ],
          "Aqua/Water/Eau, Glycerin, Alcohol Denat., Dimethicone, Butylene Glycol, Parfum/Fragrance, Phenoxyethanol, Carbomer, PEG-100 Stearate, Glyceryl Stearate, Butyrospermum Parkii Butter/Butyrospermum Parkii (Shea) Butter, Dimethiconol, Caprylyl Glycol, Mangifera Indica Juice/Mango Juice, Sodium Hydroxide, Sodium Hyaluronate, Benzyl Alcohol, Limonene, Prunus Amygdalus Dulcis Seed Extract/Sweet Almond Seed Extract, Potassium Sorbate, Sodium Dehydroacetate, Xanthan Gum, Citric Acid, Dehydroacetic Acid, CI 15985/Yellow 6, CI 19140/Yellow 5.",
          false,
          true,
          callback
        );
      },
      function (callback) {
        productsCreate(
          [
            "/images/products/product-8.jpg",
            "/images/products/product-8-1.jpg",
            "/images/products/product-8-2.jpg",
          ],
          "Indian Night Jasmine Shower Gel",
          "This shower gel will gently cleanse and fragrance your skin with notes of fragrant violet leaf and warm jasmine, deepened by rich sandalwood. ",
          categories[1].name,
          260,
          100,
          5,
          "Lather up in the shower using your hands or a bath lily.",
          [
            "Opulent, warm fragrance",
            "Refreshing and cleansing",
            "Soap-free",
            "Layer with other products in the Indian Night Jasmine range to build the fragrance",
          ],
          "Aqua/Water (Solvent), Sodium Laureth Sulfate (Surfactant), Cocamidopropyl Betaine (Surfactant), Glycerin (Humectant), Parfum/Fragrance (Fragrance Ingredient), Sodium Chloride (Viscosity Controlling Agent), PEG-40 Hydrogenated Castor Oil (Emulsifying Agent), Polyglyceryl-2 Caprate (Skin Conditioning Agent), Mel/Honey (Humectant), Sodium Benzoate (Preservative), Citric Acid (pH Adjuster), Hexyl Cinnamal (Fragrance Ingredient), Linalool (Fragrance Ingredient), Alpha-Isomethyl Ionone (Fragrance Ingredient), Disodium EDTA (Chelating Agent), Benzyl Salicylate (Fragrance Ingredient), Citronellol (Fragrance Ingredient), Hydroxycitronellal (Fragrance Ingredient), Nyctanthes Arbor-tristis Flower Extract (Fragrance Ingredient), Phenoxyethanol (Preservative), Benzoic Acid (Preservative), Dehydroacetic Acid (Preservative), Ethylhexylglycerin (Skin Conditioning Agent).",
          false,
          false,
          callback
        );
      },
      function (callback) {
        productsCreate(
          [
            "/images/products/product-9.webp",
            "/images/products/product-9-1.jpg",
            "/images/products/product-9-2.jpg",
            "/images/products/product-9-3.jpg",
          ],
          "Hemp Hand Protector",
          "Our best-selling Hemp Hand Protector helps soften and protect hands. It is dermatologically tested for very dry skin and contains hemp seed oil.",
          categories[1].name,
          300,
          225,
          8,
          "Massage a small amount onto hands as often as required.",
          [
            "100% vegetarian",
            "Enriched with Community Trade hemp seed oil from France",
            "Dermatologically tested",
            "Bestselling hand cream",
            "Relieves and protects very dry skin",
          ],
          "Aqua/Water/Eau, Glycerin, Cetearyl Alcohol, Myristyl Myristate, Cannabis Sativa Seed Oil, Ricinus Communis Seed Oil/Ricinus Communis (Castor) Seed Oil, Dimethicone, C12-15 Alkyl Benzoate, Glyceryl Stearate, PEG-100 Stearate, Cera Alba/Beeswax/Cire d’abeille, Panthenol, Methyl Soyate, Phenoxyethanol, Parfum/Fragrance, Sodium Benzoate, Allantoin, Citric Acid, Potassium Sorbate, Xanthan Gum, Hydrogenated Castor Oil, Retinyl Palmitate, Copernicia Cerifera Cera/Copernicia Cerifera (Carnauba) Wax/Cire de carnauba, Disodium EDTA, Tocopherol, Talc, CI 77288/Chromium Oxide Greens, CI 77492/Iron Oxides, CI 77491/Iron Oxides, CI 77499/Iron Oxides.",
          true,
          true,
          callback
        );
      },
      function (callback) {
        productsCreate(
          [
            "/images/products/product-10.webp",
            "/images/products/product-10-1.webp",
            "/images/products/product-10-2.jpg",
            "/images/products/product-10-3.jpg",
            "/images/products/product-10-4.webp",
            "/images/products/product-10-5.jpg",
          ],
          "Black Musk Body Lotion",
          "This lovely lotion leaves your skin feeling silky-soft and scented with a blend of our deepest, darkest, most sensual musk. The sweet notes of bambinella pear, pink pepper and bergamot are contrasted with the fierce black musk. Layer with other Black Musk products to build the fragrance.",
          categories[1].name,
          500,
          375,
          20,
          "Massage into skin and leave to sink in before dressing.",
          [
            "Body lotion",
            "Cruelty-free musk",
            "A subtle, deep blend of musk and spices",
            "Are you ready to give into temptation and fall in love with the dark side?",
          ],
          "Aqua, Ethylhexyl Palmitate, Ceteareth-20, Glycerin, Orbignya Oleifera Seed Oil, Steareth-2, Parfum, Bertholletia Excelsa Seed Oil, Phenoxyethanol, Caprylyl Glycol, Cetearyl Alcohol, Dimethicone, Butyrospermum Parkii Butter, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Maltodextrin, Benzyl Salicylate, Hexyl Cinnamal, Linalool, Hydroxycitronellal, Disodium EDTA, Limonene, Sodium Hydroxide, Alpha-Isomethyl Ionone, Coumarin, Citral, Hibiscus Abelmoschus Seed Extract, Citric Acid.",
          false,
          true,
          callback
        );
      },
    ],
    cb
  );
}

async.series([createCategories, createProducts], function (err, results) {
  if (err) {
    console.log("FINAL ERR: " + err);
  } else {
    console.log("Items: " + products);
  }
  mongoose.connection.close();
});
