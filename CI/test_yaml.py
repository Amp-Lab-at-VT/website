from unittest import TestCase
from yaml import load
from yaml import Loader
import requests
from IPython.display import Image
import os

path_to_repos = "../repos.yaml"

check = "\u2713"
cross = "\u2717"

username = "Forsyth-Creations"
token = os.environ['GITHUB_TOKEN']

class TryTesting(TestCase):
    def test_yaml_for_repo(self):
        with open(path_to_repos, "r") as f:
            repos = load(f, Loader=Loader)
                
        for repo in repos:
            issues = []

            elements = repos[repo]
            url = elements["url"]
            branch = elements["branch"]
            mentor = elements["mentor_last_name"]

            image_name = "hero.png"

            # extract the repo path and owner
            repo_path = url.split("/")[-1].split(".")[0]
            repo_owner = url.split("/")[-2]

            image_url = f"https://raw.githubusercontent.com/{repo_owner}/{repo_path}/{branch}/{image_name}"
            # pull the image from the repo

            headers = {
                'Authorization': f'token {token}'
            }
            
            r = requests.get(image_url, headers=headers)
            
            # Check #1: Mentor is not none
            if mentor is None:
                issues.append (f"{cross} Mentor is None")

            # Check #2: Branch exists
            if r.status_code != 200:
                issues.append(f"{cross} Branch {branch} does not exist")

            # Check #3: Image exists and is different than the stock image
            expected_image = f"./hero.png"
            with open(expected_image, "rb") as f:
                expected = f.read()

            if r.content == expected:
                issues.append(f"{cross} Image {image_name} is the same as the stock image")

            # show the images side by side
            # display(Image(r.content))

            # Check #4: A mentor is assigned
            if mentor is None:
                issues.append(f"{cross} Mentor is not assigned")

            # Print out the results (if the length of issues is 0, passed)
            if (len(issues) == 0):
                print(f"{check} {repo}")
                self.assertTrue(True)
            else:
                print(f"{cross} {repo} failed")
                for issue in issues:
                    print(f"\t{issue}")
                self.assertTrue(False)