from diagrams import Diagram, Cluster, Edge, Node

from diagrams.onprem.client import User, Users
from diagrams.onprem.database import PostgreSQL
from diagrams.onprem.ci import GithubActions
from diagrams.onprem.compute import Server
from diagrams.onprem.vcs import Github
from diagrams.onprem.vcs import Git
from diagrams.onprem.network import Nginx

from diagrams.onprem.client import Client
from diagrams.onprem.container import Docker

from diagrams.programming.framework import React
from diagrams.programming.language import Nodejs

from diagrams.aws.compute import EC2, EC2Instance, EC2Instances, EC2ElasticIpAddress
from diagrams.aws.network import ELB

graph_attr = {
    "fontsize": "22",
    "dpi": "150",
}

node_attr = {
    "fontsize": "16",
    # "width": "2",
}

cluster_attr_outer = {
    "fontsize": "24",
    "fontname": "Sans Serif"
}

cluster_attr_inner ={
    "fontsize": "20",
    "fontname": "Sans Serif"
}

with Diagram("Full Architecture", show=False, node_attr=node_attr, direction="LR", graph_attr=graph_attr):
    users = Users("Users")
    
    with Cluster("CI/CD", graph_attr=cluster_attr_outer):
        with Cluster("adnd-frontend", graph_attr=cluster_attr_inner): 
            frontend_repo = Github("repository")
            frontend_actions = GithubActions("build & serve")
            frontend_repo >> frontend_actions
        with Cluster("adnd-API", graph_attr=cluster_attr_inner):
            api_repo = Github("repository")
            api_tag = Git("new tag release")
            api_repo >> api_tag
        with Cluster("adnd-harvester", graph_attr=cluster_attr_inner):
            harvester_repo = Github("repository")
            harvester_actions= GithubActions("build and run\n Docker image{}".format("\n"*2), labelloc="b")
            harvester_publish = GithubActions("POST to API")

            with Cluster("Harvester-Image"):
                harvester_docker = Docker("Process Files")
                harvester_docker >> harvester_publish
            harvester_repo >> harvester_actions >> harvester_docker
    
    with Cluster("Web App (Frontend)", graph_attr=cluster_attr_outer):
        react_app = React("User Interface")
        github_pages = Github("Github Pages")
        github_pages - Edge(style="dashed") - react_app

    # with Cluster("API", graph_attr=cluster_attr_outer):
    #     api = Nodejs("API")
    #     api >> Edge(label="GET") >> react_app

    with Cluster("Backend", direction="TB", graph_attr={
        "fontsize": "22",
        "labeljust": "c",
        "direction": "TB",
    }):
        load_balancer = ELB("Load Balancer")
        with Cluster("REST API" , graph_attr={ "fontsize": "22"}):
            with Cluster("EC2 Instance Single (current)", graph_attr=cluster_attr_inner):
                ec2_1 = EC2(label="EC2 1")
                server_single = [
                    ec2_1,
                ]
                node_single = [
                        Nodejs("web server"),
                    ]
                ec2_1 >> Nginx("Rev. Proxy") >> node_single[0]
                
            with Cluster("EC2 Instances at Scale", graph_attr=cluster_attr_inner):
                ec2_dot = EC2("...")
                ec2_n = EC2("EC2 N")
                
                server_scale = [
                    ec2_dot,
                    ec2_n,
                ]
                
                node_scale = [
                    Nodejs("web server"),
                    Nodejs("web server"),
                ]
                ec2_n >> Edge(style="dashed") >> Nginx("Rev. Proxy") >> Edge(style="dashed") >> node_scale[1]
                ec2_dot >> Edge(style="dashed") >> Nginx("Rev. Proxy") >> Edge(style="dashed") >> node_scale[0]
            
            # TB_fields  = Node(shape="record", label="{ <t> top |<m> middle |<b> bottom }")
            # TB_fields2 = Node(shape="record", label="{ <t> top |<m> middle |<b> bottom }")
            # LR_fields  = Node(shape="record", label=" <f0> left|<f1> middle|<f2> right" )
            # LR_fields2 = Node(shape="record", label=" <f0> left|<f1> middle|<f2> right")

            # TB_fields  >> Edge(tailport="t", headport="m") >> TB_fields2
            # LR_fields >> Edge(tailport="f2", headport="f0") >> LR_fields2
        
        with Cluster("Database", graph_attr=cluster_attr_inner):
            ec2_db = EC2("EC2 t3.micro")
            postgres_db = PostgreSQL("database")
            ec2_db << Edge(color="deepskyblue4", style="solid") >> postgres_db
        # nginx = Nginx("Nginx\nReverse Proxy")
        # server = Nodejs("web server")
        load_balancer >> server_single[0]
        load_balancer >> Edge(style="dashed") >> server_scale

        node_single >> Edge(labeldistance="4", taillabel="Request", color="darkgreen", minlen="3") >> ec2_db
        node_scale >> Edge(labeldistance="4", style="dashed", taillabel="Request", color="darkgreen", minlen="3") >> ec2_db
        # server >> Edge(labeldistance="4", taillabel="Request", color="darkgreen", minlen="3") >> ec2_db
        # ec2_db >> Edge(taillabel="Data", labeldistance="3", minlen="3", color="deepskyblue4") >> server

    # React frontend connects to REST API
    react_app >> Edge(taillabel="Fetches data", labeldistance="6") << load_balancer
    # User connects to Github Pages
    users >> github_pages
    # new API version tags deployed to ec2 instances
    api_tag >> Edge(taillabel="                      git publish to SSH remote", labeldistance="6") >> ec2_1
    # Build and serve to Github Pages
    frontend_actions >> github_pages
    # Publish harvested data to database through API
    harvester_publish >> load_balancer