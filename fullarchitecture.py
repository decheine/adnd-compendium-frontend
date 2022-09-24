from diagrams import Diagram, Cluster, Edge, Node

from diagrams.onprem.client import User
from diagrams.onprem.database import PostgreSQL
from diagrams.onprem.ci import GithubActions
from diagrams.onprem.compute import Server
from diagrams.onprem.vcs import Github
from diagrams.onprem.vcs import Git

from diagrams.onprem.client import Client
from diagrams.onprem.container import Docker

from diagrams.programming.framework import React
from diagrams.programming.language import Nodejs

from diagrams.aws.compute import EC2, EC2Instance, EC2Instances, EC2ElasticIpAddress


graph_attr = {
    "fontsize": "16",
}

node_attr = {
    "fontsize": "16",
}

cluster_attr_outer = {
    "fontsize": "20",
    "fontname": "Sans Serif"
}

cluster_attr_inner ={
    "fontsize": "16",
    "fontname": "Sans Serif"
}

with Diagram("Full Architecture", show=False):
    client = Client("User")

    with Cluster("CI/CD", graph_attr=cluster_attr_outer):
        with Cluster("adnd-frontend", graph_attr=cluster_attr_inner): 
            frontend_repo = Github("repository")
            frontend_actions = GithubActions("build and serve")
            frontend_repo >> frontend_actions
        with Cluster("adnd-API", graph_attr=cluster_attr_inner):
            api_repo = Github("repository")
            api_tag = Git("new tag release")
            api_repo >> api_tag
        with Cluster("adnd-harvester", graph_attr=cluster_attr_inner):
            harvester_repo = Github("repository")
            harvester_actions= GithubActions("build and run Docker image")
            harvester_publish = GithubActions("POST data to API")

            with Cluster("Harvester-Image"):
                harvester_docker = Docker("Process Files")
                harvester_docker >> harvester_publish
            harvester_repo >> harvester_actions >> harvester_docker
    
    with Cluster("Web App (Frontend)", graph_attr=cluster_attr_outer):
        react_app = React("User Interface")
        github_pages = Github("Github Pages")
        github_pages - Edge(style="dashed") - react_app

    with Cluster("AWS EC2 Instances (Backend)", graph_attr={
        "fontsize": "20",
        "labelloc": "t",
        "labeljust": "c",
    }):
        with Cluster("REST API" , graph_attr={"labeljust": "c", "fontsize": "16"}):
            ec2_api = EC2("EC2 t3.micro")
            server = Nodejs("web server")
            ec2_api - Edge(color="darkgreen", style="dashed") - server
        with Cluster("Database", graph_attr=cluster_attr_inner):
            ec2_db = EC2("EC2 t3.micro")
            postgres_db = PostgreSQL("database")
            ec2_db - Edge(color="deepskyblue4", style="dashed") - postgres_db
        server >> Edge(labeldistance="4", taillabel="Request", color="darkgreen", minlen="3") >> ec2_db
        ec2_db >> Edge(taillabel="Data", labeldistance="3", minlen="3", color="deepskyblue4") >> server

    # React frontend connects to REST API
    react_app >> Edge(taillabel="Fetches data", labeldistance="6") << ec2_api
    # User connects to Github Pages
    client >> github_pages
    # new API version tags deployed to ec2 instances
    api_tag >> Edge(taillabel="                      git publish to SSH remote", labeldistance="6") >> ec2_api
    # Build and serve to Github Pages
    frontend_actions >> github_pages
    # Publish harvested data to database through API
    harvester_publish >> ec2_api