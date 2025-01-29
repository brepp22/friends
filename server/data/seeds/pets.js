// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> } 
//  */
// exports.seed = async function(knex) {
//   await knex('pets').truncate()
//   await knex('pets').insert([
//     {pet_id: 1 , img: "https://images.pexels.com/photos/28931358/pexels-photo-28931358/free-photo-of-adorable-pitbull-sitting-indoors-in-british-columbia.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" , 
//       petname: "Fluffy" , breed: "Pitbull" , weight: 57, color: "Brown", 
//       bio: "Fluffy is a sweet girl with a spunky personality. Loves to go on hikes and long walks on the beach."},
//     {pet_id: 2, img: "https://images.pexels.com/photos/126407/pexels-photo-126407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//       petname: "Dash" , breed: "Maine Coon" , weight: 8, color: "Silver", 
//       bio: "Dash is a curious and cuddly companion. Loves to hang out with the family."},
//     {pet_id: 3, img: "https://images.pexels.com/photos/160846/french-bulldog-summer-smile-joy-160846.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//       petname: "Boulder" , breed: "French Bulldog" , weight: 24, color: "Cream", 
//       bio: "Boulder is a free spirit with a lot of charm. Loves to cuddle and go on car rides."},
//     {pet_id: 4, img: "https://images.unsplash.com/photo-1644749609200-42d395e95534?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       petname: "Stripe" , breed: "Chameleon" , weight: .5, color: "Green", 
//       bio: "Stripe is a natural born climber, who enjoys being surrounded by foilage."},
//     {pet_id: 5, img: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       petname: "Ginger" , breed: "Tabby" , weight: 13, color: "Orange", 
//       bio: "Ginger is a bold and whimsical companion."},
//   ]);
// };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
 await knex('pets').del();

  // Insert the seed data
  await knex('pets').insert([
    {
      pet_id: 1,
      img: "https://images.pexels.com/photos/28931358/pexels-photo-28931358/free-photo-of-adorable-pitbull-sitting-indoors-in-british-columbia.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      petname: "Fluffy",
      breed: "Pitbull",
      weight: 57,
      color: "Brown",
      bio: "Fluffy is a sweet girl with a spunky personality. Loves to go on hikes and long walks on the beach.",
    },
    {
      pet_id: 2,
      img: "https://images.pexels.com/photos/126407/pexels-photo-126407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      petname: "Dash",
      breed: "Maine Coon",
      weight: 8,
      color: "Silver",
      bio: "Dash is a curious and cuddly companion. Loves to hang out with the family.",
    },
    {
      pet_id: 3,
      img: "https://images.pexels.com/photos/160846/french-bulldog-summer-smile-joy-160846.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      petname: "Boulder",
      breed: "French Bulldog",
      weight: 24,
      color: "Cream",
      bio: "Boulder is a free spirit with a lot of charm. Loves to cuddle and go on car rides.",
    },
    {
      pet_id: 4,
      img: "https://images.unsplash.com/photo-1644749609200-42d395e95534?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      petname: "Stripe",
      breed: "Chameleon",
      weight: 2,
      color: "Green",
      bio: "Stripe is a natural born climber, who enjoys being surrounded by foilage.",
    },
    {
      pet_id: 5,
      img: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fA%3D%3D",
      petname: "Ginger",
      breed: "Tabby",
      weight: 13,
      color: "Orange",
      bio: "Ginger is a bold and whimsical companion.",
    },
    {
      pet_id: 6,
      img: "https://images.unsplash.com/photo-1458410489211-ba19aa2f2902?q=80&w=1492&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      petname: "Coco",
      breed: "Cockatiel",
      weight: 2,
      color: "Grey",
      bio: "Coco loves to whistle while committing playful antics.",
    },
    {
      pet_id: 7,
      img: "https://images.unsplash.com/photo-1535241749838-299277b6305f?q=80&w=1492&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      petname: "Radar",
      breed: "Miniature Lop",
      weight: 7,
      color: "Beige",
      bio: "Radar is a compact ball of joy, who loves to lounge around the backyard.",
    },
    
  ]);
};
