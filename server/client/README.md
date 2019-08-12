# Redux state notes

user stuff?

students: {
  id: {
    {
      name: {
        title: String,
        first: String,
        last: String
      },
      jobSeekingStatus: String,
      employmentLocationPreference: String,
      typeOfWorkDesired: String,
      industriesPreferred: [],
      picture: {
        large: String,
        medium: String,
        thumbnail: String
      },
      bio: String,
      address: String,
      email: String,
      phone: String,
      resume: String,
      cohort: Number,
      graduationDate: Date,
      updated_at: Date,
      created_at: Date
    }
  },
  ...
}

packages: {
  id: {
    [get from backend]
  }
}

form: redux form