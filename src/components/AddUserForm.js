import React from "react";

export default function AddUserForm(props) {
  const {addUser} = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form);

    addUser(data);

    e.target.reset();
  };

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <label>
        Name:
        <input type="text" name="name" required />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" required />
      </label>
      <br />
      <label>
        Gender:
        <select name="gender" required>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <br />
      <label>
        Status:
        <select name="status" required>
          <option value="">Select</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
