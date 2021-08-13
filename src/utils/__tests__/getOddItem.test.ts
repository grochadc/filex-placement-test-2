import { getOddItem } from "../index";

const serverLinks = [
  { id: "a", link: "teacher1url", teacher: "teacher1", active: true },
  { id: "b", link: "teacher2url", teacher: "teacher2", active: true },
  { id: "c", link: "teacher3url", teacher: "teacher3", active: true },
];

test("returns the odd item", () => {
  const localLinks = [
    { id: "a", link: "teacher1url", teacher: "teacher1", active: true },
    { id: "b", link: "newteacher2url", teacher: "teacher2", active: true },
    { id: "c", link: "teacher3url", teacher: "teacher3", active: true },
  ];
  expect(getOddItem(serverLinks, localLinks)).toStrictEqual({
    id: "b",
    link: "newteacher2url",
    teacher: "teacher2",
    active: true,
  });
});
