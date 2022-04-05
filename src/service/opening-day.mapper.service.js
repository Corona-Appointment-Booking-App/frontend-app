export class OpeningDayMapperService {
  mapOpeningDay(day) {
    const mappedDays = {
      monday: "Montag",
      tuesday: "Dienstag",
      wednesday: "Mittwoch",
      thursday: "Donnerstag",
      friday: "Freitag",
      saturday: "Samstag",
      sunday: "Sonntag",
    };

    return mappedDays[day.toLowerCase()] || null;
  }
}
