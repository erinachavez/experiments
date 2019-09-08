using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class MazeEndController : MonoBehaviour {

	void Start() {
		gameObject.GetComponent<Renderer>().material.color = Color.black;
	}

	void OnTriggerEnter(Collider col){
		SceneManager.LoadScene("End");
	}
}
