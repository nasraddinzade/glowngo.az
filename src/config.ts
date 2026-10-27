// Site-wide switches. Change here, nowhere else.

/** "Demo versiya, sifarişlər qəbul edilmir" bar on top of every page. */
export const DEMO_BANNER = true;

/** Confirmed by three sources: wa.me link in the Instagram bio, 2GIS card, post captions. */
export const WHATSAPP_PHONE = "994515475601";

/** Shows the data below that has not been confirmed by the owner yet. */
export const SHOW_UNCONFIRMED = false;

export const CONTACTS = {
  phone: "+994 51 547 56 01",
  instagram: "@glowngo.az",
  instagramUrl: "https://www.instagram.com/glowngo.az/",
  store: "28 Mall, 4-cü mərtəbə",
};

/** Gift card values, taken from the shop's own post. The only numbers on the site. */
export const GIFT_CARD_VALUES = [50, 100, 150, 200];

// TODO(owner): everything below is unconfirmed. The sources disagree on the number of stores,
// so nothing here is picked on the owner's behalf.
//  - Instagram bio: 28 Mall 4th floor and Ganjlik Mall -1 floor
//  - posts from 16 Oct: the same plus Metropark 3rd floor
//  - 2GIS: Azadlıq pr. 15a/4 4th floor and Təbriz küç. 106a (no proof 106a is Metropark;
//    Ganjlik Mall is not listed for the organisation in 2GIS)
export const UNCONFIRMED = {
  stores: ["Gənclik Mall, -1 mərtəbə", "Metropark, 3-cü mərtəbə"],
  /** 2GIS only; full address of 28 Mall */
  storeAddress: "Azadlıq pr. 15a/4, 4-cü mərtəbə",
  /** 2GIS only */
  hours: "Hər gün 10:00–22:00",
  /** 2GIS only, does not match the Instagram handle */
  tiktok: "@glow.az",
  /** from posts, terms unknown */
  birthday: "Ad günündə endirim: ad günündən 2 gün əvvəl və 2 gün sonra",
};
