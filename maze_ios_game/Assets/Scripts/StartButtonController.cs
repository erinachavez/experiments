using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using System.Collections;

public class StartButtonController : MonoBehaviour {

	public void NextScene() {
		SceneManager.LoadScene("Main");
	}
}
