/**
 * The `Instructor` class represents an instructor with a unique name.
 * It ensures that only one instance of an instructor with a given name exists.
 * 
 * This class uses the singleton pattern to manage instances of instructors.
 * The constructor is private to prevent direct instantiation from outside the class.
 * Use the `getInstructor` method to retrieve an instance.
 */
class Instructor {
    private static instances: { [name: string]: Instructor } = {}; // Holds the instances by name
    private name: string;

    // Private constructor to prevent direct instantiation from outside the class
    private constructor(name: string) {
        this.name = name;
    }

    /**
     * Retrieves the existing Instructor by name or creates a new one if it doesn't exist.
     * 
     * @param name - The name of the instructor.
     * @returns {Instructor} The Instructor instance associated with the given name.
     */
    public static getInstructor(name: string): Instructor {
        if (!this.instances[name]) {
            this.instances[name] = new Instructor(name); // Create a new instance if it doesn't exist
        }
        return this.instances[name]; // Return the existing or newly created instance
    }

    /**
     * Returns a string representation of the Instructor instance.
     * 
     * @returns {string} The name of the instructor.
     */
    public toString(): string {
        return this.name;
    }
}

export default Instructor;
