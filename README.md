This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
# Person Management CRUD Application

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Features](#features)
4. [Technologies Used](#technologies-used)
5. [Project Structure](#project-structure)
6. [Live Demo](#live-demo)
8. [Usage](#usage)
9. [API Endpoints](#api-endpoints)
10. [Components](#components)
11. [Schema](#schema)
12. [Error Handling and Notifications](#error-handling-and-notifications)

## Introduction

This project is a CRUD (Create, Read, Update, Delete) application for managing person records. It allows users to add, view, edit, and delete information about individuals, including personal details, family members, and work-related information.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Features

- Create new person records
- View a list of all persons
- Edit existing person records
- Delete person records
- Form validation using Yup schema
- Responsive design using Tailwind CSS
- Toast notifications for user feedback

## Technologies Used

- Next.js (App Router)
- React
- TypeScript
- MongoDB
- Mongoose
- Tailwind CSS
- shadcn/ui components
- React Hook Form
- Yup (for schema validation)

## Project Structure

The project follows a typical Next.js application structure with some additional directories for better organization:
- `app/`: Contains the main application code, including pages and API routes.
  - `api/`: API routes for handling CRUD operations.
  - `components/`: React components used throughout the application.
    - `ui/`: Reusable UI components (buttons, inputs, etc.).
    - `person/`: Components specific to person management.
- `lib/`: Utility functions and modules, including database connection.
- `models/`: Mongoose models for database schemas.
- `schemas/`: Yup schemas for form validation.

## Live Demo

The application is hosted on Vercel and can be accessed at: [https://person-manager-xi.vercel.app/](https://person-manager-xi.vercel.app/)

You can visit this link to see the live version of the application and interact with its features.

## Usage

The Person Management application provides a user-friendly interface for managing person records. Here's a detailed guide on how to use the application:

1. **Viewing Persons**: 
   - Upon loading the application, you'll see a list of all existing person records.
   - Each record displays basic information such as name, CI (identification number), and options to edit or delete.

2. **Adding a New Person**:
   - To add a new person, fill out the form at the top of the page.
   - Required fields include Name, Last Name, CI, Date of Birth, and Gender.
   - Additional fields will appear based on your selections (e.g., RUC number if "Has RUC" is checked).
   - After filling out the form, click the "Create" button to add the new person.

3. **Editing a Person**:
   - To edit an existing person, click the "Edit" button next to their record in the list.
   - The form will be populated with the person's current information.
   - Make your changes and click the "Update" button to save the modifications.

4. **Deleting a Person**:
   - To delete a person, click the "Delete" button next to their record in the list.
   - A confirmation toast will appear to confirm the deletion.

5. **Form Validation**:
   - The form includes built-in validation to ensure data integrity.
   - Error messages will appear if required fields are left empty or if the data doesn't meet the specified criteria.

6. **Responsive Design**:
   - The application is fully responsive and can be used on desktop, tablet, or mobile devices.
     
  
## API Endpoints
The application uses the following API endpoints for CRUD operations:
1. **GET /api/persons**
   - Description: Retrieves all person records
   - Response: An array of person objects
   - Example: `GET https://person-manager-xi.vercel.app/api/persons`

2. **POST /api/persons**
   - Description: Creates a new person record
   - Request Body: Person object (without _id)
   - Response: The created person object with _id
   - Example: 
     ```
     POST https://person-manager-xi.vercel.app/api/persons
     Body: {
       "name": "John",
       "lastName": "Doe",
       "ci": "1234567890",
       "dateOfBirth": "1990-01-01",
       "gender": "male"
     }
     ```

3. **PUT /api/persons/[id]**
   - Description: Updates an existing person record
   - Request Body: Updated person object
   - Response: The updated person object
   - Example: 
     ```
     PUT https://person-manager-xi.vercel.app/api/persons/60d5ecb8b4f2a2001f9f1b0a
     Body: {
       "name": "John",
       "lastName": "Doe",
       "ci": "1234567890",
       "dateOfBirth": "1990-01-01",
       "gender": "male",
       "hasRuc": true,
       "rucNumber": "1234567890001"
     }
     ```
4. **DELETE /api/persons/[id]**
   - Description: Deletes a person record
   - Response: A success message
   - Example: `DELETE https://person-manager-xi.vercel.app/api/persons/60d5ecb8b4f2a2001f9f1b0a`
  
## Components

The application is built using the following key components:

1. **PersonManager**
   - Purpose: Main component that manages the state of the application
   - Functionality:
     - Fetches and stores the list of persons
     - Handles creating, updating, and deleting persons
     - Manages the editing state
   - File: `app/components/PersonManager.tsx`

2. **PersonForm**
   - Purpose: Renders the form for creating and editing person records
   - Functionality:
     - Dynamically shows/hides fields based on user input
     - Handles form validation using Yup schema
     - Submits form data to the parent component
   - File: `app/components/person/personForm.tsx`

3. **PersonList**
   - Purpose: Displays the list of all person records
   - Functionality:
     - Renders each person's basic information
     - Provides edit and delete options for each person
   - File: `app/components/person/personList.tsx`

4. **UI Components**
   - Purpose: Reusable UI components from shadcn/ui
   - Components used:
     - Button
     - Input
     - Textarea
     - Select
     - Checkbox
   - Directory: `app/components/ui/`
  
## Schema

The personSchema defines the structure and validations for a person's data in the application. It uses yup to ensure that the data is correct and complete, including conditional validations based on certain properties.
#### **Structure and Validations:**

1. **Personal Information:**
   - **`_id` (string):** Optional identifier.
   - **`name` and `lastName` (string):** Required. Names must be non-empty and trimmed of unnecessary spaces.
   - **`ci` (string):** Required. Custom validation to verify that the ID card number is valid according to Ecuadorian rules.
   - **`dateOfBirth` (date):** Required. Additional validation to ensure the person is over 18 years old.
   - **`gender` (string):** Required. Must be one of the following values: 'male', 'female', or 'other'.

2. **RUC Information:**
   - **`hasRuc` (boolean):** Required. Indicates if the person has a RUC (Unique Taxpayer Registry).
   - **`rucNumber` (string):** Required if `hasRuc` is `true`. Includes a custom validation to verify that the RUC is valid.

3. **Farm Information:**
   - **`hasFarm` (boolean):** Required. Indicates if the person owns a farm.
   - **`farmHa` (number):** Required if `hasFarm` is `true`. Must be a positive value representing the farm size.
   - **`farmName` (string):** Required if `hasFarm` is `true`.
   - **`crops` (array):** Required if `hasFarm` is `true`. Must contain at least one crop name.

4. **Family:**
   - **`family` (array):** Must include at least one member and no more than ten. Each member has `name`, `lastName`, and `ci`, with validations for Ecuadorian ID cards.

5. **Worker Information:**
   - **`hasWorkers` (boolean):** Required. Indicates if there are any employed workers.
   - **`totalWorkers` (number):** Required if `hasWorkers` is `true`. Must be at least 1.
   - **`menWorkers`, `womanWorkers`, `over18Workers`, `under18Workers` (number):** Cannot be negative values.
   - **Additional Validations:**
     - The sum of male and female workers must match the total number of workers.
     - The sum of workers over and under 18 years old must match the total number of workers.
     - If there are underage workers, their occupation must be specified.
     - If there are pregnant workers, their occupation must be detailed.
     - The number of pregnant workers cannot exceed the number of female workers.

### **Custom Validations:**
- **`validarCedulaEcuatoriana`:** Ensures that the ID card numbers are valid.
- **`isOver18`:** Ensures that the person is over 18 years old.
- **`validarRucEcuador`:** Validates the format and structure of the Ecuadorian RUC.

### **Usage:**
The `personSchema` is used to validate data inputs before storing or processing them, ensuring that all fields meet the required rules to prevent errors and maintain data integrity.

## Error Handling and Notifications
The application implements comprehensive error handling and user notifications:

1. **Form Validation Errors**:
   1. Displayed inline below each form field.
   2. Provide specific messages about what needs to be corrected.

2. **API Error Handling**:
   1. Catches and logs errors from API calls.
   2. Displays user-friendly error messages using toast notifications.

3. **Success Notifications**:
   1. Shows toast notifications for successful operations (create, update, delete).

4. **Network Error Handling**:
   1. Catches and displays errors if the API is unreachable.

5. **Toast Notifications**:
   1. Uses the `shadcn/ui` Toast component for consistent styling.
   2. Automatically disappear after a few seconds.
   3. Different styles for success and error messages.


