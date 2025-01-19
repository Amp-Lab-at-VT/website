import projectslist from "@/../repos"
export function getStaticProps() {
const images : string[] = [];
  // Get the hero image for each project
  for (const val of Object.values(projectslist)) {
    const branch = val["branch"];
    const [owner, repo] = val.github.split("/")!;
    const image =
      "https://raw.githubusercontent.com/" + owner + "/" + repo  + "/refs/heads/" + branch + "/hero.png";

      images.push(image)
  }

  return {
    props: {
      images,
    },
  };
}
