from unittest import TestCase
from yaml import load
from yaml import Loader
import requests
import os

path_to_repos = "../repos.yaml"

check = "\u2713"
cross = "\u2717"

username = "Forsyth-Creations"
token = os.environ.get("GITHUB_TOKEN", "")

VALID_STATUSES = ["active", "completed"]


class TryTesting(TestCase):
    def test_yaml_for_repo(self):
        with open(path_to_repos, "r") as f:
            repos = load(f, Loader=Loader)

        for repo in repos:
            issues = []

            elements = repos[repo]
            url = elements.get("url", "")
            branch = elements.get("branch", "")
            mentor = elements.get("mentor")
            status = elements.get("status")
            mission = elements.get("mission")
            participants = elements.get("participants")

            # Extract repo path and owner from the URL
            cleaned_url = url.rstrip("#").rstrip("/")
            repo_path = cleaned_url.split("/")[-1].split(".")[0]
            repo_owner = cleaned_url.split("/")[-2]

            headers = {}
            if token:
                headers["Authorization"] = f"token {token}"

            # ------------------------------------------------------------------
            # Check #1: Mentor is assigned and not empty
            # ------------------------------------------------------------------
            if not mentor:
                issues.append(f"{cross} Mentor is missing or empty")

            # ------------------------------------------------------------------
            # Check #2: Status is valid ("active" or "completed")
            # ------------------------------------------------------------------
            if not status:
                issues.append(f"{cross} Status field is missing")
            elif status.lower() not in VALID_STATUSES:
                issues.append(
                    f"{cross} Status '{status}' is invalid — must be 'active' or 'completed'"
                )

            # ------------------------------------------------------------------
            # Check #3: Mission statement exists
            # ------------------------------------------------------------------
            if not mission or len(mission.strip()) == 0:
                issues.append(f"{cross} Mission statement is missing")

            # ------------------------------------------------------------------
            # Check #4: Participants list exists and is not empty
            # ------------------------------------------------------------------
            if not participants or not isinstance(participants, list) or len(participants) == 0:
                issues.append(f"{cross} Participants list is missing or empty")

            # ------------------------------------------------------------------
            # Check #5: Branch exists (try to reach the repo branch)
            # ------------------------------------------------------------------
            branch_url = f"https://api.github.com/repos/{repo_owner}/{repo_path}/branches/{branch}"
            branch_headers = {
                "Accept": "application/vnd.github.v3+json",
                **headers,
            }
            try:
                r_branch = requests.get(branch_url, headers=branch_headers)
                if r_branch.status_code != 200:
                    issues.append(
                        f"{cross} Branch '{branch}' not found (HTTP {r_branch.status_code})"
                    )
            except requests.RequestException as e:
                issues.append(f"{cross} Could not reach GitHub API: {e}")

            # ------------------------------------------------------------------
            # Check #6: Cover image exists (hero.png, hero.jpg, or hero.jpeg)
            #           Falls back to scanning the repo root for any image file.
            # ------------------------------------------------------------------
            raw_base = f"https://raw.githubusercontent.com/{repo_owner}/{repo_path}/{branch}"
            image_found = False
            image_is_stock = False
            image_content = None

            # Try hero images first
            for filename in ["hero.png", "hero.jpg", "hero.jpeg"]:
                try:
                    r_img = requests.get(f"{raw_base}/{filename}", headers=headers)
                    if r_img.status_code == 200:
                        image_found = True
                        image_content = r_img.content
                        break
                except requests.RequestException:
                    continue

            # If no hero image, scan the repo root for any image
            if not image_found:
                try:
                    contents_url = f"https://api.github.com/repos/{repo_owner}/{repo_path}/contents?ref={branch}"
                    r_contents = requests.get(contents_url, headers=branch_headers)
                    if r_contents.status_code == 200:
                        files = r_contents.json()
                        image_files = [
                            f
                            for f in files
                            if isinstance(f, dict)
                            and f.get("type") == "file"
                            and f.get("name", "").lower().endswith(
                                (".png", ".jpg", ".jpeg")
                            )
                        ]
                        if image_files:
                            fallback_name = image_files[0]["name"]
                            r_fb = requests.get(
                                f"{raw_base}/{fallback_name}", headers=headers
                            )
                            if r_fb.status_code == 200:
                                image_found = True
                                image_content = r_fb.content
                except requests.RequestException:
                    pass

            if not image_found:
                issues.append(f"{cross} No cover image found (hero.png/jpg or any image in repo root)")

            # Check if the found image is the stock/template image
            if image_found and image_content:
                stock_image_path = "./hero.png"
                if os.path.exists(stock_image_path):
                    with open(stock_image_path, "rb") as f:
                        stock = f.read()
                    if image_content == stock:
                        issues.append(
                            f"{cross} Cover image is identical to the stock template — please use a custom image"
                        )

            # ------------------------------------------------------------------
            # Print results
            # ------------------------------------------------------------------
            if len(issues) == 0:
                print(f"{check} {repo}")
                self.assertTrue(True)
            else:
                print(f"{cross} {repo} failed:")
                for issue in issues:
                    print(f"\t{issue}")
                self.assertTrue(False)