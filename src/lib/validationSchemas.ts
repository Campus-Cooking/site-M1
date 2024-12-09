import * as Yup from 'yup';

export const AddRecipeSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters')
    .required('Title is required'),
  
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .required('Description is required'),
  
  imageURL: Yup.string()
    .url('Invalid URL format')
    .required('Image URL is required'),

  instructions: Yup.string()
    .min(20, 'Instructions must be at least 20 characters')
    .required('Instructions are required'),

  appliances: Yup.array()
    .of(Yup.string().oneOf([
      'RiceCooker',
      'PaniniPress',
      'ToasterOven',
      'Toaster',
      'Microwave',
      'HotPlate'
    ]))
    .min(1, 'At least one appliance must be selected')
    .required('Appliances are required'),

  categories: Yup.array()
    .of(Yup.string().oneOf([
      'Breakfast',
      'Lunch',
      'Dinner',
      'Vegan',
      'Meat',
      'Dessert',
      'Chocolate'
    ]))
    .min(1, 'At least one category must be selected')
    .required('Categories are required'),

  cookTime: Yup.string()
    .required('Cook time is required')
    .min(3, 'Cook time must be at least 3 characters')
    .max(20, 'Cook time must not exceed 20 characters'),
});